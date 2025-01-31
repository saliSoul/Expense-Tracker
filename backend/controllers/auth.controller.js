import { generateToken } from "../config/utils.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js"

export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body;
    try{
        //hash passwords bcryptjs
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required."})
        }

        if(password.length<8){
            return res.status(400).json({message:"Password must be at least 8 characters"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"Email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
        })
        if(newUser){
            //generate JWT TOKEN here
            generateToken(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });
        }else{
            res.status(400).json({message:"Invalid user data"});
        }
    }catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}  

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        console.log("User found: ", user); // Log user to check if data exists in the DB

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log("Password comparison result: ", isPasswordCorrect); // Check if passwords match

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out Successfully"})
    }catch(error){
        console.log("Error inlogout controller", error.message);
        res.status(500).json({message:"Internal server error"});
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        
        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
        
        // Return the updated user object after profile picture is uploaded
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profile", error.message);
        res.status(500).json({ message: "Internal server Error" });
    }
};


export const checkAuth = (req,res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkAuth controller ",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

// controllers/auth.controller.js

export const deleteUser = async (req, res) => {
    const { id } = req.params;  // Get the user ID from the route parameter
    try {
        const user = await User.findByIdAndDelete(id);  // Find and delete the user by their ID

        if (!user) {
            return res.status(404).json({ message: "User not found" });  // If no user is found
        }

        res.status(200).json({ message: "User deleted successfully" });  // Success message
    } catch (error) {
        console.log("Error deleting user", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// controllers/auth.controller.js

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();  // Find all users in the database
        res.status(200).json(users);  // Return the users as JSON response
    } catch (error) {
        console.log("Error fetching users", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

