import multer from "multer";
import fs from "fs";
import path from "path";
import userModel from "../models/model.user.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads")) {
      cb(null, "./uploads");
    } else {
      fs.mkdirSync("./uploads", true);
      cb(null, "./uploads");
    }
  },
  filename: function (req, file, cb) {
    const imgName = file.originalname;
    const imgArr = imgName.split(".");
    imgArr.pop();
    const imgExt = path.extname(imgName);
    const fname = imgArr.join(".") + "-" + Date.now() + imgExt;
    cb(null, fname);
  },
});

const upload = multer({ storage: storage });

export const addNewUser = (req, res) => {
  try {
    const uploadFile = upload.single("profileImage");

    uploadFile(req, res, function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const { first_name, last_name, username, email, password } = req.body;
      let image = "";
      if (req.file !== undefined) {
        image = req.file.filename;
      }
      console.log(image);
      console.log(req.body);

      const userdata = new userModel({
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: password,
        profileImage: image,
      });
      userdata.save();
      if (userdata) {
        res.status(201).json({
          data: userdata,
          message: `New user has been added successfully.`,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: message.error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const usersdata = await userModel.find({ status: 1 });
    res.status(200).json({
      data: usersdata,
      message: `Data fetched successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      message: message.error,
    });
  }
};

export const getSingleUser = async (req, res) => {
  const { username, password, _id } = req.query;
  if (_id !== undefined) {
    try {
      const userdata = await userModel.findOne({
        status: 1,
        _id: _id,
      });
      res.status(200).json({
        data: userdata,
        message: `User fetched successfully.`,
      });
    } catch (error) {
      res.status(500).json({
        message: message.error,
      });
    }
  } else {
    try {
      const userdata = await userModel.findOne({
        status: 1,
        username: username,
        password: password,
      });
      res.status(200).json({
        data: userdata,
        message: `User fetched successfully.`,
      });
    } catch (error) {
      res.status(500).json({
        message: message.error,
      });
    }
  }
};
