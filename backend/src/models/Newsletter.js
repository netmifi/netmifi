const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

// This is a TTL index on the generatedCode.expiresIn field
module.exports = mongoose.model('Newsletter', newsletterSchema);