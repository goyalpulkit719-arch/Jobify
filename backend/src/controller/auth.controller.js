const userModel = require('../model/user.model');
const candidateModel = require('../model/candidate.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { uploadFile } = require('../services/storage.service');


async function registerUser(req, res) {

    try{
        const email = req.body.email;

        const isUserAlreadyExists = await userModel.findOne({email: email});

        if(isUserAlreadyExists) {
            return res.status(409).json({success: false, message: "User Already Exists"});
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        let avatarUrl = "";
        
        if(req.file) {
            const file = req.file;
            const result = await uploadFile(file.buffer.toString('base64'), `avatar_${Date.now()}`, "jobify/user");

            avatarUrl = result.url;
        }

        const user = await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role: req.body.role,                // candidate, company
            location: req.body.location,
            avatar: avatarUrl,
            phone: req.body.phone,
        })

        if(user.role === 'candidate') {
            await candidateModel.create({
                owner: user._id,
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: req.body.role,
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        return res.status(201).json({
            success: true, 
            message: "User Created Successfully",
            data: user,
        })
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }

}


async function loginUser(req, res) {

    try{        
        console.log(req.body);
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({success: false, message: "Email and password are required"});
        }

        const user = await userModel.findOne({email: email});

        if(!user) {
            return res.status(401).json({success: false, message: "Invalid Credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({success: false, message: "Invalid Credentials"});
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        const userData = user.toObject();
        delete userData.password;

        return res.status(200).json({
            success: true, 
            message: "User logged in Successfully",
            data: userData,
        });
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }
 
}


async function logoutUser(req, res) {

    try{   
        res.clearCookie("token");
        res.status(200).json({success: true, message: "User logged out successfully"});
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }

};


async function updateProfile(req, res) {

    try{    
        const decoded = req.user;

        let user = await userModel.findById(decoded.id).select("-password");

        const updateData = {};

        if(req.body.phone !== undefined) {
            updateData.phone = req.body.phone;
        }

        if(req.body.location !== undefined) {
            updateData.location = req.body.location;
        }

        if(req.body.name !== undefined) {
            updateData.name = req.body.name;
        }

        if(req.file) {
            const result = await uploadFile(req.file.buffer.toString('base64'), `avatar_${Date.now()}`, "jobify/user");
            updateData.avatar = result.url;
        }

        Object.assign(user, updateData);
        await user.save();

        return res.status(200).json({
            success: true, 
            message: "User data updated successfully",
            data: user,
        })
    }catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }

};


async function getProfile(req, res) {

    try{    
        const decoded = req.user;

        const user = await userModel.findById(decoded.id).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: user,
        })
    }catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }
};


async function changePassword(req, res) {

    try{    
        const decoded = req.user;
        const password = req.body.password;

        let user = await userModel.findById(decoded.id);

        const hash = await bcrypt.hash(password, 10);
        user.password = hash;

        await user.save();

        return res.status(200).json({
            success: true, 
            message: "Password changed",
            data: user,
        })
    }catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }

};


module.exports = { registerUser, loginUser, logoutUser, updateProfile, getProfile, changePassword }