import express from "express";
import {
  addCar,
  changeRoleToOwner,
  deleteCar,
  getDashboardData,
  getOwnerCars,
  toggleCarAvailability,
  updateUserImage,
} from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/change-role", changeRoleToOwner);
router.post("/add-car", upload.single("image"), addCar);
router.get("/cars", getOwnerCars);
router.post("/toggle-car", toggleCarAvailability);
router.post("/delete-car", deleteCar);

router.get("/dashboard", getDashboardData);
router.post("/update-image", upload.single("image"), updateUserImage);

export default router;
