import mongoose from "mongoose";

const UserSchema = mongoose.Schema;

const userModel = new UserSchema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  profileImage: {
    type: String,
    default: null,
  },
});
export default mongoose.model("users", userModel);
