import taskModel from "../models/model.task";

export const getTasks = async (req, res) => {
  const { userid, status, page, limit } = req.query;
  const skipno = (Number(page) - 1) * limit;
  try {
    const taskData = await taskModel
      .find({ status: status, user_id: userid })
      .limit(limit)
      .skip(skipno);
    res.status(200).json({
      data: taskData,
      message: `Task data fetched successfully`,
    });
    console.log(taskData);
  } catch (error) {
    res.status(500).json({
      message: message.error,
    });
  }
};

export const addTask = (req, res) => {
  try {
    const { task_name, creator_name, user_id } = req.body;
    console.log(task_name);
    const userdata = new taskModel({
      task_name: task_name,
      creator_name: creator_name,
      user_id: user_id,
    });
    userdata.save();
    if (userdata) {
      res.status(200).json({
        data: userdata,
        message: `Task added successfully.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: message.error,
    });
  }
};

export const editTask = async (req, res) => {
  try {
    const { task_id } = req.query;
    const { status, taskname } = req.body;
    const updateTaskStatus = await taskModel.updateOne(
      { _id: task_id },
      {
        $set: {
          status: status,
          task_name: taskname,
        },
      }
    );
    if (updateTaskStatus.acknowledged) {
      return res.status(200).json({
        data: updateTaskStatus,
        message: "Updated successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
