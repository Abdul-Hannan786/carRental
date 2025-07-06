import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
