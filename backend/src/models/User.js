const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        instructorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        instructorName: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        oldPrice: { type: Number, required: false },
        category: { type: String, required: false },
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
    }
);


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    profile: {
        type: String,
    },
    cover: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        minlength: 7,
        required: function () { return !this.googleId; }, // Conditional requirement if the sign up is coming from google
        trim: true
    },
    country: {
        name: String, dialCode: String, code: String, flag: String
    },
    phone: {
        type: String,
    },
    theme: {
        type: String,
        default: 'system',
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Blogger: Number,
        Instructor: Number,
        Admin: Number,
        SuperAdmin: Number,
        Overseer: Number,
    },
    interests: {
        type: [String],
        default: [],
        required: true,
    },
    adSources: {
        type: [String],
        default: [],
        required: true,
    },
    residentialAddress: {
        type: String,
        trim: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    handles: {
        facebook: {
            type: String,
            default: ''
        },
        instagram: {
            type: String,
            default: ''
        },
        tiktok: {
            type: String,
            default: ''
        },
        youtube: {
            type: String,
            default: ''
        },
        website: {
            type: String,
            default: ''
        }
    },
    about: {
        type: String,
        default: "",
    },
    generatedCode: {
        type: {
            state: String,
            code: Number,
            expiresIn: Date,
        },
    },
    cart: {
        type: Array,
        of: cartSchema,
        required: false,
        default: [],
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
userSchema.index({ 'generatedCode.expiresIn': 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model('User', userSchema);
