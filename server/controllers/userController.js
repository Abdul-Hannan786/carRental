import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
  const payload = id;
  return jwt.sign(payload, process.env.AUTH_SECRET);
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: "Fill all the fileds" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user._id.toString());

    res.json({ success: true, token, user });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isPassswordValid = await bcrypt.compare(password, user.password);
    if (!isPassswordValid) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());
    res.json({ success: true, token, user });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
