import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function authenticateUser(req, res, next) {
  try {
    const token = req?.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.json({ success: false, message: "Not authorized" });
    }

    let decoded;
    try {
      decoded = jwt.decode(token, process.env.AUTH_SECRET);
    } catch (err) {
      return res.json({ success: false, message: "Invalid token." });
    }

    const user = await User.findById(decoded).select("-password");
    if (!user) {
      return res.send({ success: false, message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in user route", error);
    return res.json({ success: false, message: "Error in user route" });
  }
}
