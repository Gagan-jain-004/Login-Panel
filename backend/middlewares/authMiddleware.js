import jwt from "jsonwebtoken";

import User from "../models/User.js";



export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");
  console.log("Decoded user:", req.user);

    next();
  } catch (err) {
    console.error("Token Verification Failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }

};

// admin only access

export const adminOnly = (req, res, next) => {
  console.log("adminOnly middleware running");
  console.log("User role:", req.user?.role);

  if (req.user?.role === "admin") {
    next();
  } else {
    console.log("Blocked: not admin");
    res.status(403).json({ message: "Admin access only" });
  }
};

// Role based access 
// middleware/authMiddleware.js

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user?.role)) {
      next();
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  };
};
