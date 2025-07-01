import express from  "express";

import User from "../models/User.js";
import {protect,adminOnly} from "../middlewares/authMiddleware.js";
import bcrypt from "bcryptjs";


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


// GET /api/admin/users/schools
// router.get("/users/schools", protect, adminOnly, async (req, res) => {
//   try{const { search = "", page = 1, limit = 10,month } = req.query;
//   const filter = {
//     department: { $regex: /^school$/i },
//     name: { $regex: search, $options: "i" }
//   };

//    if (month) {
//       // Expecting month as "YYYY-MM" format
//       const [year, monthNum] = month.split("-");
//       const monthPattern = new RegExp(`^\\d{1,2}/` + Number(monthNum) + `/${year}$`);
//       filter.createdAt = { $regex: monthPattern };
//     }

//   const skip = (page - 1) * limit;
//   const total = await User.countDocuments(filter);
//   const users = await User.find(filter)
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(Number(limit));

//   res.json({ users, total });
//   }catch(err){
//     console.error("error fetching school users:",err);
//     res.status(500).json({ message: "Error fetching school users" });
//   }
// });


router.get("/users/schools", protect, adminOnly, async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10, month } = req.query;

    const filter = {
      department: { $regex: /^school$/i },
      name: { $regex: search, $options: "i" }
    };

    if (month) {
      const [year, monthNum] = month.split("-"); // e.g. "2025-06"
      const start = new Date(year, parseInt(monthNum) - 1, 1); // 1 June
      const end = new Date(year, parseInt(monthNum), 1);       // 1 July
      filter.createdAt = { $gte: start, $lt: end };
    }

    const skip = (page - 1) * limit;
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ users, total });
  } catch (err) {
    console.error("Error fetching school users:", err);
    res.status(500).json({ message: "Error fetching school users" });
  }
});


router.post("/users/schools", protect, adminOnly, async (req, res) => {
  const { name, email, password, city, address, mobile,organizationCode } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name, email, password: hashed, department: "school",
    city, address, mobile,
    role: "user", approved: true,organizationCode,
  });
  res.status(201).json(user);
});



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



//IT

 router.get("/users/it", protect, adminOnly, async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10, month } = req.query;
    const filter = {
      department: { $regex: /^it$/i },
      name: { $regex: search, $options: "i" },
    };

    if (month) {
      const [year, monthNum] = month.split("-");
      const start = new Date(year, parseInt(monthNum) - 1, 1);
      const end = new Date(year, parseInt(monthNum), 1);
      filter.createdAt = { $gte: start, $lt: end };
    }

    const skip = (page - 1) * limit;
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ users, total });
  } catch (err) {
    res.status(500).json({ message: "Error fetching IT users" });
  }
});

 

router.post("/users/it", protect, adminOnly, async (req, res) => {
  const { name, email, password, city, address, mobile,organizationCode, } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name, email, password: hashed, department: "it",
    city, address, mobile,
    role: "user", approved: true,organizationCode,
  });
  res.status(201).json(user);
});


//accounts 
router.get("/users/accounts", protect, adminOnly, async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10, month } = req.query;
    const filter = {
      department: { $regex: /^accounts$/i },
      name: { $regex: search, $options: "i" },
    };

    if (month) {
      const [year, monthNum] = month.split("-");
      const start = new Date(year, parseInt(monthNum) - 1, 1);
      const end = new Date(year, parseInt(monthNum), 1);
      filter.createdAt = { $gte: start, $lt: end };
    }

    const skip = (page - 1) * limit;
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ users, total });
  } catch (err) {
    res.status(500).json({ message: "Error fetching accounts users" });
  }
});

 

router.post("/users/accounts", protect, adminOnly, async (req, res) => {
  const { name, email, password, city, address, mobile,organizationCode } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name, email, password: hashed, department: "accounts",
    city, address, mobile,
    role: "user", approved: true,organizationCode,
  });
  res.status(201).json(user);
});

// dispatch
router.get("/users/dispatch", protect, adminOnly, async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10, month } = req.query;
    const filter = {
      department: { $regex: /^dispatch$/i },
      name: { $regex: search, $options: "i" },
    };

    if (month) {
      const [year, monthNum] = month.split("-");
      const start = new Date(year, parseInt(monthNum) - 1, 1);
      const end = new Date(year, parseInt(monthNum), 1);
      filter.createdAt = { $gte: start, $lt: end };
    }

    const skip = (page - 1) * limit;
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ users, total });
  } catch (err) {
    res.status(500).json({ message: "Error fetching dispatch users" });
  }
});

 

router.post("/users/dispatch", protect, adminOnly, async (req, res) => {
  const { name, email, password, city, address, mobile,organizationCode } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name, email, password: hashed, department: "dispatch",
    city, address, mobile,
    role: "user", 
    approved: true,
    organizationCode,
  });
  res.status(201).json(user);
});


export  default router;




















// router.get("/users/schools", protect, adminOnly, async (req, res) => {
//   try {
//     const schoolUsers = await User.find({
//       department: { $regex: /^school$/i }, // ✅ case-insensitive match
//     });
//     res.json(schoolUsers);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });
