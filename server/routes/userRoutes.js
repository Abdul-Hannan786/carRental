import express from "express"
import { getCars, getUserData, loginUser, registerUser } from "../controllers/userController.js"
import { authenticateUser } from "../middleware/auth.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/data", authenticateUser, getUserData)
router.get("/cars", getCars)

export default router