const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  // limits: { fileSize: 5 * 1024 * 1024 }, // for photos?
  limits: { fileSize: 100000000 }, // for videos?

  fileFilter: function (req, file, cb) {
    // for photos?
    // const filetypes = /jpeg|jpg|png|gif/;
    // const mimetype = filetypes.test(file.mimetype);
    // const extname = filetypes.test(
    //   path.extname(file.originalname).toLowerCase()
    // );

    // if (mimetype && extname) {
    //   return cb(null, true);
    // } else {
    //   cb(
    //     new Error(
    //       "Error: File upload only supports the following filetypes - " +
    //       filetypes
    //     )
    //   );
    // }

    // for videos?
    const filetypes = /.mp4|.avi|.mkv|.mov/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (extname) {
      return cb(null, true);
    } else {
      cb("Error: Videos Only!");
    }
  },
});

// Route for uploading single file
app.post("/upload_single", upload.single("singleFile"), uploadSingle);

function uploadSingle(req, res) {
  // console.log("req file", req.file);
  console.log(req.body);
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const uploadedFile = req.file;
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      uploadedFile.filename
    }`;
    // console.log(fileUrl);
    res.json({ message: "Successfully uploaded single file", fileUrl });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

// Route for uploading multiple files
app.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.json({ message: "Successfully uploaded files" });
}

// for multiple uploading
app.post(
  "/upload_multiple",
  upload.fields([
    { name: "singleFile", maxCount: 1 },
    { name: "files", maxCount: 5 },
  ]),
  multipleUploads
);

function multipleUploads(req, res) {
  console.log("nameSingleMultiple", req.body.nameSingleMultiple);
  console.log("singleFile", req.files.singleFile);
  console.log("files", req.files.files);
  res.json({ message: "Successfully uploaded Multiple files" });
}

// for videos
app.post("/upload_video", upload.single("video"), (req, res) => {
  if (req.file) {
    console.log("video", req.file);
    res.json({
      message: "Video uploaded successfully!",
    })
  } else {
    res.status(400).json({ message: "Failed to upload video" })
  }
})

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files from the "uploads" folder

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(8000, () => {
  console.log(`Server started...`);
});
