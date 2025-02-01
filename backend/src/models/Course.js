const mongoose = require('mongoose');
const { Schema } = mongoose;

// Dynamic Field Schema (for handling dynamic fields such as video, title, etc.)
const dynamicFieldSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false },
        video: { type: String, required: false }, // Will store the file path for video
    },
    { _id: false } // Prevent MongoDB from automatically generating an ID for each dynamic field
);

// Course Schema
const courseSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        oldPrice: { type: Number, required: false },
        mentorshipAvailability: { type: String, enum: ['yes', 'no'], required: false },
        mentorshipAvailabilityDays: { type: [String], required: false },
        from: { type: String, required: false }, // Could store time as a string (e.g., '14:00')
        to: { type: String, required: false },

        // File uploads
        thumbnail: { type: String, required: true }, // Path to thumbnail file
        introVideo: { type: String, required: true }, // Path to intro video file
        slugUrl: { type: String, required: true },
        sections: {
            type: Map,
            of: dynamicFieldSchema, // Each dynamic field is represented by the dynamicFieldSchema
            required: false,
        },
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Create a Mongoose model for the course
module.exports = mongoose.model('Course', courseSchema);
