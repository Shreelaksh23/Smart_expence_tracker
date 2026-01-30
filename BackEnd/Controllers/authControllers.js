const User=require("../models/User.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

//register
exports.registerUser=async(req,res)=>{
    try {
        
        if (!req.body) {
            return res.status(400).json({ message: "Request body missing" });
        }

        const {name,email,password}=req.body;

        if(!name || !email ||!password){
            return res.status(400).json({message:"All fields are required"});
        }

        const exists=await User.findOne({email});
        if(exists){
            return res.status(400).json({message:"User already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        await User.create({
            name,
            email,
            password:hashedPassword,
        });

        res.status(201).json({message:"User registered successfully"})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//login
exports.loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}