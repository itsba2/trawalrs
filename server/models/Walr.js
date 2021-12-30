import mongoose from 'mongoose';

const WalrSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 30,
    },
    desc: {
      type: String,
      required: true,
      max: 50,
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
    long: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Walr', WalrSchema);
