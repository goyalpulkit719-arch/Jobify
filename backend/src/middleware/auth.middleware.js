const jwt = require('jsonwebtoken');

async function authCandidate(req, res, next) {

    try {
        
        const token = req.cookies.token;
        
        if(!token) {
            return res.status(401).json({success: false, message: "Login required"});
        }
        
        try{
        
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        
            if(decoded.role !== 'candidate') {
                return res.status(403).json({success: false, message: "You don't have access"});
            }
        
            req.user = decoded;
        
            next();
        
        }
        catch(err) {
            console.log(err);
            return res.status(401).json({success: false, message: "Unauthorized"});
        }
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }



};


async function authCompany(req, res, next) {

    try {

        const token = req.cookies.token;
        
        if(!token) {
            return res.status(401).json({success: false, message: "Login required"});
        }

        try{

            const decoded = await jwt.verify(token, process.env.JWT_SECRET);

            if(decoded.role !== 'company') {
                return res.status(403).json({success: false, message: "You don't have access"});
            }

            req.user = decoded;

            next();

        }
        catch(err) {
            console.log(err);
            return res.status(401).json({success: false, message: "Unauthorized"});
        }

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }

};


async function authLogin(req, res, next){

    try {
        
        const token = req.cookies.token;
        
        if(!token) {
            return res.status(401).json({success: false, message: "Login required"});
        }
        
        try{
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        
            req.user = decoded;
        
            next();
        
        }
        catch(err) {
            console.log(err);
            return res.status(401).json({success: false, message: "Unauthorized"});
        }

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false, 
            message: "Internal Server Error",
        });
    }

}


module.exports = { authCandidate, authCompany, authLogin };