import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  addCar,
  changeRoleToOwner,
  deleteCar,
  getOwnerCars,
  toggleCarAvailability,
} from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/change-role", changeRoleToOwner);
router.post("/add-car", upload.single("image"), addCar);
router.get("/cars", getOwnerCars);
router.post("/toggle-car", toggleCarAvailability);
router.post("/delete-car", deleteCar);

export default router;
