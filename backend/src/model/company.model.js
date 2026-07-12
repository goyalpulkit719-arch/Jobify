const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
    website: {
        type: String,
        lowercase: true,
    },
    industry: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    employees: {
        type: Number,
    },
    founded: {
        type: Number,
    },
    jobTypes: [{
        type: String,
        enum: [
            "Full-time",
            "Part-time",
            "Internship",
            "Contract"
        ]
    }],
    workModes: [{
        type: String,
        enum: [
            "Remote",
            "On-site",
            "Hybrid"
        ]
    }],
}, {
    timestamps: true,
});


const companyModel = mongoose.model("company", companySchema);


module.exports = companyModel;
