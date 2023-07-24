import express from "express";
import { addTask, editTask, getTasks } from "../controller/controller.task.js";

const taskRouter = express.Router();

taskRouter.get("/get_tasks", getTasks);
taskRouter.post("/add_task", addTask);
taskRouter.put("/edit_task", editTask);

export default taskRouter;
