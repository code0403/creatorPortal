import mongoose from "mongoose";

const creatorSchema = new mongoose.Schema({
  name: String,
  designation: String,
  about: String,
  price: Number,
  images: [String],
});

export default mongoose.model("Creator", creatorSchema);
