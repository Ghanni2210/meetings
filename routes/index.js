const express = require('express')
const router = express.Router()
const meetingsModel = require('../models/meetings');
const _ = require("lodash");


router.post('/meetings', async function (req, res) {
    let meetingExists = await meetingsModel.findOne({ id: req.body.id });
    if (meetingExists) {
        console.log("meetingExists");
        let newData = await meetingsModel.findOneAndUpdate({ _id: meetingExists._id }, { $push: { participant: req.body.participant } }, { new: true })
        res.send({ status: "success", data: newData })
    } else {
        console.log("createNew");
        let data = new meetingsModel(req.body);
        let meeting = await data.save();
        res.send({ status: "success", data: meeting })
    }
});


router.get('/meetings/:id', async function (req, res) {
    try {
        let meetingId = req.params.id;
        let meetings = await meetingsModel.find({ id: meetingId });
        res.send({ status: "success", data: meetings })
    } catch (error) {
        console.log(error.stack);
        res.status(500).send('Invalid id')
    }
});


router.get('/meetings', async function (req, res) {
    let startTime = req.query.start;
    let endTime = req.query.end;
    let participant = req.query.participant;
    if (startTime && endTime) {
        let meetings = await meetingsModel.find({
            startTime: { $gte: startTime },
            endTime: { $lte: endTime }
        });
        res.send({ status: "success", data: meetings })
    } else if (participant) {
        let meeting = await meetingsModel.find({ "participant.email": participant })
        res.send({ status: "success", data: meeting })
    } else {
        res.send({ status: "error", data: "Invalid data" })
    }
});


module.exports = router
