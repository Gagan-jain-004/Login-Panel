import express from "express";
import User from "../models/User.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Generic user fetch
router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Approve user
router.put("/approve/:id", protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.approved = true;
  await user.save();
  res.json({ message: "User approved" });
});

// Reject user
router.delete("/reject/:id", protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.deleteOne();
  res.json({ message: "User rejected and deleted" });
});

router.put("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updates = req.body;

    // Don't allow password updates via this route
    if (updates.password) {
      delete updates.password;
    }

    // Update fields
   Object.keys(updates).forEach(key => {
  if (key !== 'password') {
    user[key] = updates[key];
  }
});


    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Error updating user",error:err.message });
  }
});


// Common fetch logic
const fetchUsersByDepartment = async (req, res, department) => {
  try {
    const { search = "", page = 1, limit = 10, date } = req.query;

   const filter = {
  department: { $regex: new RegExp(`^${department}$`, "i") },
  $or: [
    { name: { $regex: search, $options: "i" } },
    { organizationCode: { $regex: search, $options: "i" } }
  ]
};


    if (date) {
      const selectedDate = new Date(date);
      filter.createdAt = {
        $gte: new Date(selectedDate.setHours(0, 0, 0, 0)),
        $lte: new Date(selectedDate.setHours(23, 59, 59, 999))
      };
    }

    const skip = (page - 1) * limit;
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ users, total });
  } catch (err) {
    res.status(500).json({ message: `Error fetching ${department} users` });
  }
};

// Common post logic
const createUser = async (req, res, department) => {
  try {
    const {
      name, email, password, city, address, mobile, organizationCode,
      district, state, pincode,
      principalName, principalMobile, coordinatorName, coordinatorMobile, landline,
      schoolBoard, schoolMedium, schoolType, schoolAffiliation,
      physicsTeacherName, chemistryTeacherName, mathsTeacherName, biologyTeacherName,
      physicsTeacherContact, chemistryTeacherContact, mathsTeacherContact, biologyTeacherContact,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hashedPassword, department,
      city, address, mobile, organizationCode,
      district, state, pincode,
      principalName, principalMobile,
      coordinatorName, coordinatorMobile, landline,
      schoolBoard, schoolMedium, schoolType, schoolAffiliation,
      physicsTeacherName, chemistryTeacherName, mathsTeacherName, biologyTeacherName,
      physicsTeacherContact, chemistryTeacherContact, mathsTeacherContact, biologyTeacherContact,
      role: "user", approved: true
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: `Error creating ${department} user`, error: err.message });
  }
};

// ========== School ==========
router.get("/users/schools", (req, res) => fetchUsersByDepartment(req, res, "school"));
router.post("/users/schools", (req, res) => createUser(req, res, "school"));

// ========== IT ==========
router.get("/users/it", (req, res) => fetchUsersByDepartment(req, res, "it"));
router.post("/users/it", protect, adminOnly, async (req, res) => {
  const { name, email, password, city, address, mobile, organizationCode } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name, email, password: hashed, department: "it",
    city, address, mobile, organizationCode,
    role: "user", approved: true
  });
  res.status(201).json(user);
});

// ========== Accounts ==========
router.get("/users/accounts", (req, res) => fetchUsersByDepartment(req, res, "accounts"));
router.post("/users/accounts", protect, adminOnly, async (req, res) => {
  const { name, email, password, city, address, mobile, organizationCode } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name, email, password: hashed, department: "accounts",
    city, address, mobile, organizationCode,
    role: "user", approved: true
  });
  res.status(201).json(user);
});

// ========== Dispatch ==========
router.get("/users/dispatch", (req, res) => fetchUsersByDepartment(req, res, "dispatch"));
router.post("/users/dispatch", protect, adminOnly, async (req, res) => {
  const { name, email, password, city, address, mobile, organizationCode } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name, email, password: hashed, department: "dispatch",
    city, address, mobile, organizationCode,
    role: "user", approved: true
  });
  res.status(201).json(user);
});

// ========== Delete by ID ==========
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;














 
