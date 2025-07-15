import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import  connectDB from './config/mongodb.js'
import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"

dotenv.config();

const app = express();
const port =  4000;

connectDB();


//cors middleware

app.use(cors({
    origin : [
         "http://localhost:5173",
         "https://login-panel-eta.vercel.app",
         "https://login-panel-git-main-gagan-jain-004s-projects.vercel.app",
         "https://login-panel-gagan-jain-004s-projects.vercel.app",

    ]
    ,credentials:true
}));
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("api is working");
    
})

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);



app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);  
})
