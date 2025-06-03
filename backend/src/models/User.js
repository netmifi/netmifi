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
            required: false
        },
        quantity: { type: Number, required: false, default: 1 },
        instructorName: { type: String, required: false },
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

const searchHistorySchema = new Schema(
    {
        query: { type: String, required: true },
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
    timestamps: true,
}
);

const userProgressSchema = new Schema({
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    currentSection: { type: Number, default: 0 },
    completedSections: [{ type: Number }],
    quizScores: [{
        sectionId: String,
        score: Number,
        attempts: Number,
        lastAttempt: Date
    }],
    lastAccessed: { type: Date, default: Date.now },
    completedAt: { type: Date },
    certificateIssued: { type: Boolean, default: false }
}, { _id: false });

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
        trim: true,
        unique: true
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
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student'
    },
    level: {
        type: Number,
        default: 1,
        min: 1,
        max: 100
    },
    xp: {
        type: Number,
        default: 0
    },
    rank: {
        type: String,
        enum: ['novice', 'apprentice', 'intermediate', 'advanced', 'expert', 'master'],
        default: 'novice'
    },
    interests: {
        type: [String],
        default: [],
        required: true,
    },
    enrolledCourses: [userProgressSchema],
    cart: {
        type: Array,
        of: cartSchema,
        required: false,
        default: [],
    },
    searchHistory: {
        type: Array,
        of: searchHistorySchema,
        required: false,
        default: [],
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

userSchema.index({
    firstName: 'text',
    lastName: 'text',
    username: 'text',
    email: 'text',
    about: 'text'
}
    , {
        weights: {
            username: 10,
            firstName: 8,
            lastName: 7,
            email: 5,
            about: 3
        }
    }
);

userSchema.index({ firstName: 1 })
userSchema.index({ lastName: 1 })
userSchema.index({ username: 1 })
userSchema.index({ email: 1 })
userSchema.index({ role: 1 })
userSchema.index({ level: 1 })
userSchema.index({ rank: 1 })

userSchema.statics.clearExpiredCodes = async function () {
    const now = new Date();
    await this.updateMany(
        { 'generatedCode.expiresIn': { $lte: now } },
        { $unset: { generatedCode: '' } }
    );
};

module.exports = mongoose.model('User', userSchema);
