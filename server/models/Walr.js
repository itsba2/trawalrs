import mongoose from "mongoose";

const WalrSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 100,
    },
    desc: {
      type: String,
      max: 300,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    photo: {
      type: String,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Walr", WalrSchema);
