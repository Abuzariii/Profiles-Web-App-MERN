const express = require("express");
const router = new express.Router();
const multer = require("multer");
const profiles = require("../model/profilesSchema");
const fs = require("fs");
const path = require("path");

// Image Storage Path
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});
// Image Filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("You can only upload Images"));
  }
};
// Image Upload Function
const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

// Add User Route
router.post("/register", upload.single("photo"), async (req, res) => {
  const { filename } = req.file;
  const { fname, gender } = req.body;

  try {
    const userdata = new profiles({
      fname: fname,
      imgpath: filename,
      gender: gender,
    });

    const savedData = await userdata.save();
    res.status(201).json({ status: 201, savedData });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// Get Users Route
router.get("/getdata", async (req, res) => {
  try {
    const getUser = await profiles.find();

    res.status(201).json({ status: 201, getUser });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// Delete User Route
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await profiles.findById(id);
    const img = user.imgpath;
    const dltUser = await profiles.findByIdAndDelete({ _id: id });
    res.status(201).json({ status: 201, dltUser });

    const filePath = path.join(__dirname, "..", `/uploads/${img}`);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Successfully deleted ${img}`);
    });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

module.exports = router;
