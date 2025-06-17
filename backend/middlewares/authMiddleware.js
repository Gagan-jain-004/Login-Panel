import jwt from "jsonwebtoken";

import User from "../models/User.js";


export const protect = async (req,res,next)=>{
    let token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: "No token provided"});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password ");
        next();
    }catch(err){
        return res.status(401).json({message: "Invalid token"});
    }

}


// admin only access

export const adminOnly = (req,res,next) =>{
    if(req.user?.role === "admin"){
        next();
    } else {
        res.status(403).json({message: "Admin access only "});

    }
};

// Role based access 

export const allowRoles = (...roles)=>{
    return (req,res,next)=>{
        if(roles.included(req.user?.role)){
            next();
        }else{
            res.status(403).json({message: "Access denied"});
        }
    }
}