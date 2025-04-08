const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: 'pending',
    },
    niche: {
        type: String,
    },
    whyInterest: {
        type: String,
        default: "",
    },
    taughtBefore: {
        type: String,
        default: "no",
    },
    mentoredPreviously: {
        type: String,
        default: "no",
    },
}, { timestamps: true });

// Text index on full name for searching
instructorSchema.index({ fullName: 'text' });
module.exports = mongoose.model('Instructor', instructorSchema);