import express from  "express";

import User from "../models/User.js";
import {protect,adminOnly} from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/users",protect,adminOnly,async (req , res)=>{

    const users = await User.find();
    res.json(users);

});


router.put("/approve/:id", protect,adminOnly,async(req,res) =>{
    const user = await User.findById(req.params.id);

    if(!user)  return  res.status(404).json({message: "User not found "});

    user.isApproved = true;
    await user.save();
    res.json({message: "User approved "});

});


router.delete("/reject/:id", protect,adminOnly,async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({message: "User not found "});

    await user.deleteOne();
    res.json({message: "User rejected and deleted "});

})

export  default router;