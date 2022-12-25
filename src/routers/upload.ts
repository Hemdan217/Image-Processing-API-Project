import express from "express";
import path from "path";
let upload = express.Router();

const templatePath = path.resolve(process.cwd(), "./src/");

/////
upload.get("/upload", (req, res) => {
  res.sendFile(templatePath + "/public/upload.html");
});

upload.post("/upload", (req, res) => {
  // console.log(req.body);
  /** { img: 'palmtunnel.jpg', width: '500', height: '500' }* */

  const height = parseInt(req.body.height);
  const width = parseInt(req.body.width);
  const seletedImage = req.body.img;
  console.log(height, width);
  /// after getting the image from the server , redirect to api
  res.redirect(
    `/api?path=${seletedImage.slice(
      0,
      seletedImage.length - 4
    )}&width=${width}&height=${height}`
  );
});
export default upload;
