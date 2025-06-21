
import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connection.on('connected',()=> console.log("Db connected successfully"));

    await mongoose.connect(`${process.env.MONGO_URI}/Login-Portal`);        
};

export default connectDB;
