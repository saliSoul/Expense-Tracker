import express from "express";
import { signup, login,logout,updateProfile,deleteUser,getAllUsers } from '../controllers/auth.controller.js';
import protectRoute from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.put("/update-profile", protectRoute, updateProfile);
router.delete("/:id", protectRoute, deleteUser )
router.get("/getAllUsers", protectRoute, getAllUsers )

export default router;