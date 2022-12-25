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
const sharp = require('sharp');
/// Create Router
let placeholder = express_1.default.Router();
/// the path that contains the html files
const templatePath = path_1.default.resolve(process.cwd(), './src/public');
const thumbFolder = path_1.default.resolve(process.cwd(), './assets/thumb');
placeholder.get('/placeholder', (req, res) => {
    // console.log(req.query); http://localhost:3000/placeholder?&width=444&height=500&red=102&green=100&blue=104
    const width = req.query.width;
    const height = req.query.height;
    const red = req.query.red;
    const green = req.query.green;
    const blue = req.query.blue;
    const check = req.query.check;
    console.log(req.query);
    /*

    This will the output of the image after resizing it for example if the image name = 'hemdan'
    and we want resize it into 200*200 it will be resized and saved with name 'hemdan_200_200.jpg' in the
    ./assets/thumb folder
      **/
    let outputFile = path_1.default.join(thumbFolder, `placeholder_${width}_${height}_${red}_${green}.jpg`);
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
            console.log('The image exists already');
            res.sendFile(outputFile);
        })
            .catch(() => console.error('The image is not exists before, we will generate it now '));
        try {
            if (!exists) {
                // console.log(exists);
                await sharp({
                    create: {
                        width: parseInt(width) || 500,
                        height: parseInt(height) || 500,
                        channels: 4,
                        background: {
                            r: parseInt(red) || 238,
                            g: parseInt(green) || 238,
                            b: parseInt(blue) || 238,
                            alpha: 0.5,
                        },
                    },
                })
                    .toFile(outputFile)
                    .then((info) => {
                    if (check) {
                        res.send(info);
                        console.log(info);
                    }
                    else {
                        res.sendFile(outputFile);
                    }
                });
            }
        }
        catch (e) {
            // catch errors and send error status
            console.log(e);
            res.sendFile(templatePath + '/failure.html');
        }
    })();
});
exports.default = placeholder;
