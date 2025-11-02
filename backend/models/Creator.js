import mongoose from "mongoose";

const creatorSchema = new mongoose.Schema({
  name: String,
  designation: String,
  about: String,
  price: Number,
  images: [String],
  email: { type: String, required: false }, 
}, { timestamps: true });

export default mongoose.model("Creator", creatorSchema);
