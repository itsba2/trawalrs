import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", UserSchema);
