const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    education: { type: String },

    // Skills as a simple array of strings
    skills: [{ type: String }],

    // Projects as an array of sub-documents
    projects: [{
        title: { type: String, required: true },
        description: { type: String },
        links: [{ type: String }] // Array of strings for various links
    }],

    // Work as an array of sub-documents
    work: [{
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],

    // Social links as a nested object
    links: {
        github: { type: String },
        linkedin: { type: String },
        portfolio: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
