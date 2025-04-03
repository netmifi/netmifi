const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    password: {
        type: String,
        minlength: 7,
        required: true,
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
    cart: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
}, { timestamps: true });

// This is a TTL index on the generatedCode.expiresIn field
userSchema.index({ 'generatedCode.expiresIn': 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('User', userSchema);