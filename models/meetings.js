const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const meetings = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    participant: [{
        name: { type: String, required: true },
        email: { type: String, required: true },
        rsvp: { type: String, enum: ['Yes', 'No', 'Maybe', 'Not Answered'], required: true, default: 'Not Answered' },
    }],
    startTime: { type: Date, required: true, default: Date.now() },
    endTime: { type: Date, required: true, default: Date.now() },
}, { timestamps: true });

meetings.plugin(uniqueValidator, { message: 'is already taken' });


let meetingsModel = mongoose.model('meetings', meetings);

module.exports = meetingsModel; 
