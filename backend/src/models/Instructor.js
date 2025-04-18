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
}, {   toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  },
  toObject: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
    },
    timestamps: true
});

// - index for status filtering
instructorSchema.index({ status: 1 });
// Text index on full name for searching
instructorSchema.index({ 
  fullName: 'text', 
}, {
  weights: {
    fullName: 10,
  }
});

module.exports = mongoose.model('Instructor', instructorSchema);