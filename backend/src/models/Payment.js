const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  transactionId: { type: Number, required: true, unique: true },
  reference: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true,
    unique: true
  },
  gateway: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  items: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
}, {
  toJSON: {
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

// This is a TTL index on the generatedCode.expiresIn field
module.exports = mongoose.model('Payment', paymentSchema);