import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./router/router.user";
import taskRouter from "./router/router.task";
import dotenv from "dotenv";

dotenv.config();

// const BASE_URL = process.env.BASE_URL || 8001;
const DATABASEURL = process.env.DATABASEURL;

const app = express();
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

mongoose
  .connect(DATABASEURL)
  .then(() => console.log("Database Connected!"))
  .catch((error) => console.log(error));

app.use(userRouter);
app.use(taskRouter);
