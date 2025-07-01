import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import crypto from "crypto";
import transporter from "../config/nodemailer.js";



const generateToken = (user)=>{
    return jwt.sign(
        {id: user._id, role: user.role, isApproved: user.isApproved},
        process.env.SECRET_KEY,
        {expiresIn: "10d"}
    );
};



export  const signup  = async(req , res )=>{
    try {
        const {name,email,password,department,city, address,mobile,organizationCode } = req.body;
   
    const existing = await User.findOne({email});
    
    if(existing) {
        return res.status(400).json({message: "user already exists"});
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPassword,
         department: department?.toLowerCase(),
         city,    
      address,  
      mobile,
      organizationCode,
        role: "user", 
        isApproved: false,

    });

    await user.save();
    return res.status(201).json({message:"Signup successful, admin approval pending"})
    }

    catch(err){
        res.status(500).json({message: err.message})
    }
}





export const login = async (req, res) =>{
    try {
        const  {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found "});

        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({message: "Wrong Password"})

        //  if(!user.isApproved && user.role != "admin") {
        //     return res.status(403).json({message: "account not approved by admin"})
        //  }
         
         const token = generateToken(user);
         res.status(200).json({token,user});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};





export const forgotPassword = async (req,res)=>{

    const {email } = req.body;

    try{
        const user = await User.findOne({email})

        if(!user) return res.statue(400).json({message: "user not found"});

        const token = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;   
        await user.save();

        

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_ID,
            subject: "Reset Password",
            html : `<p>Click this <a href="http://localhost:5173/reset-password/${token}">link</a> to reset your password </p>`,
        };

        transporter.sendMail(mailOptions,()=>{
            res.json({message: "Reset email sent"});
        });


    }catch(err){
            res.status(500).json({message: err.message})
    }
}




export const resetPassword  = async (req,res) =>{

    const {token} = req.params;
    const {password} = req.body;

    try{
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if(!user) return res.status(400).json({message: "Token invalid or expired "})

        const hashed = await bcrypt.hash(password,10);

        user.password = hashed;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({message: "Password reset successfully"});

    }catch(err){
        res.status(500).json({message: err.message});
    }

};