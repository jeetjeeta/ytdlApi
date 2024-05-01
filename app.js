const express = require("express");
const cors = require("cors");
// const fetch = require("node-fetch");

const GetAudio = require("./others/GetAudio");
const GetVideo = require("./others/GetVideo");

const PORT = process.env.PORT || 8083;
const app = express();
app.use(express.static(__dirname + "/public"));

app.use(express.json());
const corsOptions = {
  origin: "http://example.com",
  credentials: true,
};

app.use(cors(corsOptions));
// app.use(express.json)

// expected payload : youtube url, title, quality(suffix y if source is y2mate) 128 or 128y
app.get("/getaudio", async (req, res) => {
  const queryObj = req.query;
  console.log("queryobj: ", queryObj);

  const { url, title, q } = queryObj;

  try {
    const data = await GetAudio(url, title, q);
    res.status(200).json(data);
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json("some error in getting audio");
  }
});

// expected payload : youtube url, quality(suffix y if source is y2mate) 360 or other with y prefix
app.get("/getvideo", async (req, res) => {
  const queryObj = req.query;
  console.log("queryobj: ", queryObj);

  const { url, q } = queryObj;

  try {
    const data = await GetVideo(url, q);
    res.status(200).json(data);
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json("some error in getting video");
  }
});

// for sample test for hosting platforms to check if nodejs is running or not
app.get("/hello", (req, res) => {
  res.json("hello boy");
});

const server = app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
