const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
// const multer = require("multer");
const path = require("path");
// const db = require("./src/models");

const app = express();
app.use(fileUpload());

app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/upload", async (req, res) => {
  if (!req.files || !req.files.audio) {
    return res.status(400).send("No audio file uploaded");
  }

  const audioFile = req.files.audio;
  const fileName = `${Date.now()}-${audioFile.name}`;

  audioFile.mv(path.join(__dirname, 'uploads', fileName), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file');
    }
    res.send('File uploaded successfully');
  });

//   try {
//     const newAudioFile = await db.Audio.create({
//       name: fileName,
//       audio: audioFile.data,
//     });

//     return res.status(200).json("File uploaded successfully");
//   } catch (error) {
//     return res.status(500).send("Error uploading file");
//   }
});

app.post("/audio", async (req, res) => {
  try {
    // const audioFile = await db.Audio.findOne({
    //   where: {
    //     name: req.body.name + ".mp3",
    //   },
    // });
    // // console.log(audioFile)
    // return res.status(200).json({
    //   data: audioFile,
    //   msg: "Get all audio successful",
    // });
  } catch (error) {
    return res.status(404).json("Error get files");
  }
});

app.get("/allaudio", async (req, res) => {
  try {
    // const allAudio = await db.Audio.findAll({
    //   raw: true,
    // });

    // return res.status(200).json({
    //   data: allAudio,
    //   msg: "Get all audio successful",
    // });
  } catch (error) {
    return res.status(404).json("Error get files");
  }
});
app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
