const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({

    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: true,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    status: {
        type: "String",
        enum: ["Applied", "Shortlisted", "Interview", "Rejected", "Hired"],
        default: "Applied",
    },
}, {
    timestamps: true,
});

applicationSchema.index(
    { candidate: 1, job: 1 },
    { unique: true }
);


const applicationModel = mongoose.model("application", applicationSchema);

module.exports = applicationModel;