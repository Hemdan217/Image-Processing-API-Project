"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//// Import the main module
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
const sharp = require("sharp");
/// Create Router
let mainRouter = express_1.default.Router();
/// the path that contains the html files
const templatePath = path_1.default.resolve(process.cwd(), "./src/public");
const imagesFolder = path_1.default.resolve(process.cwd(), "./assets/images");
const thumbFolder = path_1.default.resolve(process.cwd(), "./assets/thumb");
mainRouter.get("/api", (req, res) => {
    // console.log(req.query); http://localhost:3000/api?path=image&width=4444&height=500
    const imagePath = req.query.path;
    const width = req.query.width;
    const height = req.query.height;
    /*
  
      This will the output of the image after resizing it for example if the image name = 'hemdan'
      and we want resize it into 200*200 it will be resized and saved with name 'hemdan_200_200.jpg' in the
      ./assets/thumb folder
        **/
    let outputFile = path_1.default.join(thumbFolder, `${imagePath}_${width}_${height}.jpg`);
    let err = false;
    (async () => {
        let exists = false;
        /*
    
        let check if the resized image exists already
          **/
        await fs_1.promises
            /// if we can to access it this means that it exists
            .access(outputFile, fs_2.default.constants.W_OK)
            .then(() => {
            exists = true;
            console.log("The image exists already");
            res.sendFile(outputFile);
        })
            .catch(() => console.error("The image is not exists before, it will resized now "));
        try {
            if (!exists) {
                // console.log(exists);
                await sharp(`${imagesFolder}/${imagePath}.jpg`)
                    //// if the client did't provide the width and height , the image will be resized into 300*300
                    .resize(parseInt(width) || 300, parseInt(height) || 300)
                    .toFile(outputFile)
                    .then((info) => {
                    console.log(info);
                    // res.send(info);
                    res.sendFile(outputFile);
                });
            }
        }
        catch (e) {
            // catch errors and send error status
            console.log(e);
            res.sendFile(templatePath + "/failure.html");
        }
    })();
});
exports.default = mainRouter;
