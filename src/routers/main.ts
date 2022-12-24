//// Import the main module
import express from "express";
import path from "path";
import { promises as fspromises } from "fs";
import fs from "fs";
const sharp = require("sharp");

/// Create Router
let mainRouter = express.Router();
/// the path that contains the html files
const templatePath = path.resolve(process.cwd(), "./src/public");
const imagesFolder = path.resolve(process.cwd(), "./assets/images");
const thumbFolder = path.resolve(process.cwd(), "./assets/thumb");

mainRouter.get("/api", (req: express.Request, res: express.Response) => {
  // console.log(req.query); http://localhost:3000/api?path=image&width=4444&height=500
  const imagePath = req.query.path;
  const width = req.query.width as unknown as string;
  const height = req.query.height as unknown as string;
  /*

    This will the output of the image after resizing it for example if the image name = 'hemdan'
    and we want resize it into 200*200 it will be resized and saved with name 'hemdan_200_200.jpg' in the 
    ./assets/thumb folder
      **/
  let outputFile = path.join(
    thumbFolder,
    `${imagePath}_${width}_${height}.jpg`
  );

  let err = false;
  (async () => {
    let exists = false;
    /*

    let check if the resized image exists already
      **/

    await fspromises
      /// if we can to access it this means that it exists
      .access(outputFile, fs.constants.W_OK)
      .then(() => {
        exists = true;
        console.log("The image exists already");
        res.sendFile(outputFile);
      })
      .catch(() =>
        console.error("The image is not exists before, it will resized now ")
      );
    try {
      if (!exists) {
        // console.log(exists);
        await sharp(`${imagesFolder}/${imagePath}.jpg`)
          //// if the client did't provide the width and height , the image will be resized into 300*300
          .resize(parseInt(width) || 300, parseInt(height) || 300)
          .toFile(outputFile)
          .then((info: any) => {
            console.log(info);
            // res.send(info);
            res.sendFile(outputFile);
          });
      }
    } catch (e) {
      // catch errors and send error status

      console.log(e);
      res.sendFile(templatePath + "/failure.html");
    }
  })();
});

export default mainRouter;
