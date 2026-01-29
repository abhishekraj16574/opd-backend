import Token from "../models/Token.js";
import Doctor from "../models/Doctor.js";
import { PRIORITY_MAP } from "../utils/priority.js";


export const allocateToken = async ({
  patientId,
  doctorId,
  slotStartTime,
  slotEndTime,
  type
}) => { 
  const normalizeTime = (time) => {
    return time.trim().padStart(5, "0");
  };

   const normalizedStart = normalizeTime(slotStartTime);
  const normalizedEnd = normalizeTime(slotEndTime);

  const doctor=await Doctor.findById(doctorId);
  if(!doctor){
    throw new Error ("Doctor not found");
  }

  const slot = doctor.slots.find(s => 
     normalizeTime(s.startTime) === normalizedStart &&
      normalizeTime(s.endTime) === normalizedEnd
  );
  if (!slot) {
    throw new Error("Slot not found for doctor");
  }   

  const priority = PRIORITY_MAP[type];
  const slotKey = `${doctorId}_${normalizedStart}_${normalizedEnd}`;

  const activeTokens = await Token.find({slotKey,status:"ACTIVE"}).sort({priority:1});

  if(activeTokens.length < slot.effectiveCapacity){
    return await Token.create({patientId,
      doctorId,
      slotKey,
      type,
      priority,
      status: "ACTIVE"});
  }
  const lowestPriorityToken = activeTokens[0];

  if(priority > lowestPriorityToken.priority){
    lowestPriorityToken.status = "REALLOCATED";
    await lowestPriorityToken.save();

    return await Token.create({
       patientId,
      doctorId,
      slotKey,
      type,
      priority,
      status: "ACTIVE"
    });
  }

  return await Token.create({
     patientId,
      doctorId,
      slotKey,
      type,
      priority,
      status: "WAITLISTED"
  })
};

export const cancelToken = async (tokenId) => {
  const token = await Token.findById(tokenId);
  if(!token){
    throw new Error("Token not found");
  }

  const wasActive = token.status === "ACTIVE";

  token.status = "CANCELLED";
  await token.save();

    if (!wasActive) return token;
    
  const waitlistedToken = await Token.findOne({
    slotKey: token.slotKey,
    status:"WAITLISTED"
  }).sort({priority: -1});

  if(waitlistedToken){
    waitlistedToken.status = "ACTIVE";
    await waitlistedToken.save();

  }
  return token;
};