import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type : String, required: true},
    email: {type: String , required: true,unique:true},
    password: {type: String, required: true},
    role: {type: String,default: "user",enum: ["admin","user"]},
    department: {type: String, required: true},
    approved: {type: Boolean, default: false},
     resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
},{timestamps:  true});




const userModel = mongoose.models.user || mongoose.model('user',userSchema)   

export default userModel;