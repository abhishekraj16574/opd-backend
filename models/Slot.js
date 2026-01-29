import mongoose from "mongoose";

const slotSchema = mongoose.Schema({
  doctorId:String,
  startTime:String,
  endTime:String,
  capacity:Number
});
export default mongoose.model("Slot",slotSchema);