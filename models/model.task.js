import mongoose from "mongoose";

const UserSchema = mongoose.Schema;

const taskModel = new UserSchema({
  task_name: {
    type: String,
    required: true,
  },
  creator_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("tasks", taskModel);
