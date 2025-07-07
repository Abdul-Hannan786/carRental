import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const bookingSchema = new Schema(
  {
    car: { type: ObjectId, ref: "Cars", required: true },
    user: { type: ObjectId, ref: "Users", required: true },
    owner: { type: ObjectId, ref: "Users", required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Bookings", bookingSchema);
export default Booking;
