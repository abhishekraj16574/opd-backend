import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
    slotKey: {
      type: String,
      required: true,
      index: true  
    },
    type: {
      type: String,
      enum: ["EMERGENCY", "PAID", "FOLLOWUP", "ONLINE", "WALKIN"],
      required: true
    },
    priority: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["ACTIVE", "WAITLISTED", "REALLOCATED", "CANCELLED"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema);
