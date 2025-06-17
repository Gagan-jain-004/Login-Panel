import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type : String, required: true},
    email: {type: String , required: true},
    password: {type: String, required: true},
    role: {type: String,default: "User"},
    department: String,
    approved: {type: Boolean, default: false},
},{timestamps:  true});




const userModel = mongoose.models.user || mongoose.model('user',userSchema)   

export default userModel;