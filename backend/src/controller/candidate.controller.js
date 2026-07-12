const candidateModel = require('../model/candidate.model');
const { uploadFile } = require('../services/storage.service');  

async function updateProfile(req, res) {

    try{

        const decoded = req.user;
        const candidate = await candidateModel.findOne({owner: decoded.id});

        if(!candidate) {
            return res.status(404).json({success: false, message: "Candidate Not Found"});
        }

        const { headline, bio, skills, experience, projects, github, linkedin } = req.body;
        const updateData = {};

        if(headline !== undefined) updateData.headline = headline;
        if(bio !== undefined) updateData.bio = bio;
        if(skills !== undefined) updateData.skills = JSON.parse(skills);
        if(experience !== undefined) updateData.experience = experience;
        if(projects !== undefined) updateData.projects = JSON.parse(projects);
        if(github !== undefined) updateData.github = github;
        if(linkedin !== undefined) updateData.linkedin = linkedin;

        if(req.file) {
            const result = await uploadFile(req.file.buffer.toString('base64'), `resume_${Date.now()}.pdf`, "jobify/resume");

            updateData.resume = result.url;
        }

        Object.assign(candidate, updateData);
        await candidate.save();

        return res.status(200).json({
            success: true, 
            message: "Profile updated successfully",
            data: candidate,
        })

    }
    catch(err) {
        console.log(err);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }

}


async function getProfile(req, res) {

    try{

        const decoded = req.user;

        const candidate = await candidateModel.findOne({owner: decoded.id}).populate("owner");

        if(!candidate) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        return res.status(200).json({
            success: true, 
            message: "Profile Fetched successfully",
            data: candidate,
        })

    }
    catch(err) {
        console.log(err);
        return res.status(500).json({success: false, message: "Interval Server Error"})
    }

}


module.exports = { updateProfile, getProfile };