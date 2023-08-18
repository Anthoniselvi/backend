import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  profileId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, default: "" },
  age: { type: Number, default: "" },
  gender: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
});

const Profiles = mongoose.model("Profiles", ProfileSchema);
export default Profiles;
