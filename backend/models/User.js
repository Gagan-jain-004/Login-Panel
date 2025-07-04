import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type : String, required: true},
    email: {type: String , required: true,unique:true},
    password: {type: String, required: true},
    role: {type: String,default: "user",enum: ["admin","user"]},
    department: {type: String, required: true},
    organizationCode: { type: String },
    approved: {type: Boolean, default: false},
     resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    city: { type: String }, 
  address: { type: String },
  mobile: { type: String },

district: String,
  state: String,
  pincode: String,

  principalName: String,
  principalMobile: String,
  coordinatorName: String,
  coordinatorMobile: String,
  landline: String,

  schoolBoard: { type: String, enum: ["CBSE", "ICSE", "STATE"] },
  schoolMedium: { type: String, enum: ["English", "Hindi", "Both"] },
  schoolType: { type: String, enum: ["Government", "Private"] },
  schoolAffiliation: { type: String, enum: ["Primary", "Secondary", "Senior Secondary"] },

  physicsTeacherName: String,
  chemistryTeacherName: String,
  mathsTeacherName: String,
  biologyTeacherName: String,

  physicsTeacherContact: String,
  chemistryTeacherContact: String,
  mathsTeacherContact: String,
  biologyTeacherContact: String,


},{timestamps:  true});




const userModel = mongoose.models.user || mongoose.model('user',userSchema)   

export default userModel;