import express from "express";

import { signup,login,forgotPassword,resetPassword } from "../controllers/authController.js";


const router = express.Router();


router.post("/signup",signup);
router.post("/login",login);
router.post("/forgotPassword",forgotPassword);
router.post("/resetPassword",resetPassword);

export default router ;
