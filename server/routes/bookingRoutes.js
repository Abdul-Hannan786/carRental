import express from "express";
import {
  changebookingStatus,
  checkAvailabilityOfCar,
  createBooking,
  getOwnerBookings,
  getUserBookings,
} from "../controllers/bookingController.js";
import { authenticateUser } from "../middleware/auth.js";
const router = express.Router();

router.post("/check-availability", checkAvailabilityOfCar);
router.post("/create", authenticateUser, createBooking);
router.get("/user", authenticateUser, getUserBookings);
router.get("/owner", authenticateUser, getOwnerBookings);
router.post("/change-status", authenticateUser, changebookingStatus);

export default router