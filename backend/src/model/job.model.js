const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    employmentType: {
        type: String,
        enum: [
            "Full-time",
            "Part-time",
            "Internship",
            "Contract"
        ],
        required: true,
    },
    minSalary: {
        type: Number,
        min: 0,
        default: 0,
    },
    maxSalary: {
        type: Number,
        min: 0,
        default: 0,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    workMode: {
        type: String,
        enum: [
            "Remote",
            "On-site",
            "Hybrid"
        ],
        required: true,
    },
    benefits: [{
        type: String,
        trim: true,
    }],
    description: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,
});


const jobModel = mongoose.model("job", jobSchema);

module.exports = jobModel;