const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require('../../utils/generatetoken'); 
const User = require("../../models/user.model");
const nodemailer = require('nodemailer'); 
const BlacklistToken = require("../../models/blacklistToken.model");


module.exports.Register = async (req, res) => {
  try {
    const { name, email, password, role = 'student' } = req.body;

    // Validation
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword, role });

    if (user) {
      const token = generateToken(user);

      // ✅ Send token in cookie instead of JSON
      res.cookie("token", token, {
        httpOnly: true, // prevents JavaScript access
        secure: process.env.NODE_ENV === "production", // use HTTPS in prod
        sameSite: "lax",
         path: "/",    
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token
      });
    } else {
      return res.status(400).json({ message: 'User not created.' });
    }

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports.Login = async (req, res) => {
  try {
    const { email , password } = req.body;
    // Validate input
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    // Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT
    const token = generateToken(user);

    // ✅ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "lax",
       path: "/",    
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports.ForgetPassword = async function (req, res){
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({ message: 'User Not Found' });
    }
  
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_KEY ,
      { expiresIn: '1d' }
    );
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true, 
      auth: {
        user: process.env.MY_GMAIL ,
        pass: process.env.MY_GMAIL_PASS ,
      },
    });
    const receiver = {
      from : process.env.MY_GMAIL ,
      to : email ,
      subject : "Password Reset Request" ,
      text : ` Welcome to Notes Hunter Click on this link to generate new Password ${process.env.CLIENT_URL}/reset-password/${token}`
    };
    await transporter.sendMail(receiver);
    return res.status(200).send({ message: "Password Reset Link Sent Sucessfully"})
  }
  catch ( err ){
    console.error("Something went wrong", err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports.ResetPassword = async function(req, res)
{
  try{
    const {token} = req.params ;
    const {password} = req.body ;
    if(!password){
    return res.status(400).send( { message: "Please Provide Password"})
    }
    const decode = jwt.verify(token , process.env.JWT_KEY)
    const user =  await User.findOne({_id:decode.id})
    const salt = await bcrypt.genSalt(10);
    const newhashpassword = await bcrypt.hash(password, salt);
    user.password = newhashpassword ;
    await user.save();
    return res.status(200).send( { message: "password reset Sucessfully"})
  }
  catch(err){
  console.error("Something went wrong", err)};
  return res.status(500).json({ message: 'Internal Server Error' });
}


module.exports.Logout = async (req, res) => {
  try {
    const token = req.cookies.token  || req.header("Authorization")?.replace("Bearer ", ""); // Read from cookie
    if (!token) return res.status(400).json({ message: "No token found" });

    // Decode token to get expiry
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000);

    // Save blacklisted token
    await BlacklistToken.create({ token, expiresAt });

    // Clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout error", error: error.message });
  }
};

