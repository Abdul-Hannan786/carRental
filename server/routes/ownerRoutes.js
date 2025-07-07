import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { changeRoleToOwner } from "../controllers/ownerController.js";

const router = express.Router();

router.post("/change-role", authenticateUser, changeRoleToOwner);

export default router;
