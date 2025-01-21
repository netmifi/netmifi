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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
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
        minlength: 5,
        trim: true,
        default: 'system',
    },
    roles: {
        user: {
            type: Boolean,
            default: true,
        },
        blogger: {
            type: Boolean,
            default: false,
        },
        instructor: {
            type: Boolean,
            default: false,
        },
        admin: {
            type: Boolean,
            default: false,
        },
        superAdmin: {
            type: Boolean,
            default: false,
        },
        overseer: {
            type: Boolean,
            default: false,
        },
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
        web: {
            type: String,
            default: ''
        }
    },
    generatedCode: {
        type: {
            state: String,
            code: Number,
            expiresIn: Date,
        },
    }
}, { timestamps: true });


// This is a TTL index on the generatedCode.expiresIn field
userSchema.index({ 'generatedCode.expiresIn': 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model('User', userSchema);