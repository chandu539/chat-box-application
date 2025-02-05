import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id);

        // 🔥 Set JWT token in a **httpOnly** cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set to true in production
            sameSite: "Strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic || "",
            message: "Signup successful",
        });

    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = generateToken(user._id);

        // 🔥 Set JWT token in a **httpOnly** cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set to true in production
            sameSite: "Strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic || "",
            message: "Login successful",
        });

    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const logout = (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
};



// Cloudinary Configuration (Make sure this is in a separate config file)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user?.id; // Ensure req.user exists
  
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      if (!profilePic) {
        return res.status(400).json({ message: "Profile picture is required" });
      }
  
      // If profilePic is a URL (from Cloudinary or a pre-uploaded image), update directly
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  


export const checkAuth = (req,res) =>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in chechAuth controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}