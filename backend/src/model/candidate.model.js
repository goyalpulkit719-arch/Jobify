const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
    },
    headline: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    skills: {
        type: [String],
        default: [],
    },
    experience: {
        type: Number,
        default: 0,
    },
    projects: {
        type: [String],
        default: [],
    },
    resume: {
        type: String,
        default: "",
    },
    github: {
        type: String,
        default: "",
    },
    linkedin: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});


const candidateModel = mongoose.model("candidate", candidateSchema);


module.exports = candidateModel;