const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const participants = new mongoose.Schema({
    name: { type: String , required: true},
    email: { type: String, unique: true, required: true },
    rsvp: { type: String, required: true },
    meetingId: { type: String, required: true },
}, { timestamps: true });

participants.plugin(uniqueValidator, { message: 'is already taken' });


mongoose.model('participants', participants);
