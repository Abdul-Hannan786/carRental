import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import { authenticateUser } from "./middleware/auth.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/user", userRouter);
app.use("/api/owner", authenticateUser, ownerRouter);
app.use("/api/bookings", bookingRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
