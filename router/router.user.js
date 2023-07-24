import express from "express";
import {
  addNewUser,
  getUser,
  getSingleUser,
} from "../controller/controller.user";

const userRouter = express.Router();

userRouter.post("/add_new_user", addNewUser);
userRouter.get("/get_users", getUser);
userRouter.get("/get_user", getSingleUser);

export default userRouter;
