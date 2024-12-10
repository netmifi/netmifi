import { UserSchemaDocument } from '@/types';
import mongoose, { Schema, Document } from 'mongoose';

const UserSchema: Schema = new Schema({
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
    theme: {
        type: String,
        minlength: 5,
        trim: true,
        default: 'system',
    },
    roles: {
        type: [String],
        default: ['user'] // Default role set to 'user'
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
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    // refreshToken: {
    //     type: String,
    //     default: '',
    // },
    generatedCode: {
        type: {
            for: String,
            code: Number,
        },
    }
}, { timestamps: true });

const User = mongoose.model<UserSchemaDocument>('User', UserSchema);
export default User;