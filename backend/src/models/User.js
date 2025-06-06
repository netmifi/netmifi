const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        unique: true,
        trim: true,
        lowercase: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        minlength: 6,
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: String
    },
    bio: {
        type: String
    },
    achievements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
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

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Generate auth token
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};

// Remove token
userSchema.methods.removeToken = async function(token) {
    this.tokens = this.tokens.filter(t => t.token !== token);
    await this.save();
};

// Find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid login credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid login credentials');
    }
    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
