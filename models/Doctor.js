import mongoose from "mongoose";

const slotSchema = mongoose.Schema({
  startTime: {
    type: String,
    required:true
  },
  endTime: {
    type: String,
    required:true
  },
   capacity: {
    type: Number,
    required:true
  },
   effectiveCapacity: {
    type: Number,
    default: function(){
      return this.capacity;
    }
  }
});

const doctorSchema = mongoose.Schema({
  name:
  {
    type:String,
  required:true
  },
   department:
  {
    type:String,
  required:true
  },
  slots:[slotSchema]
},
{timestamps: true}
);

export default mongoose.model("Doctor",doctorSchema);