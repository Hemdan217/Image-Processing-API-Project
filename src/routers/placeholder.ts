//// Import the main module
import express from 'express';
import path from 'path';
import { promises as fspromises } from 'fs';
import fs from 'fs';
const sharp = require('sharp');

/// Create Router
let placeholder = express.Router();
/// the path that contains the html files
const templatePath = path.resolve(process.cwd(), './src/public');
const thumbFolder = path.resolve(process.cwd(), './assets/thumb');

placeholder.get(
  '/placeholder',
  (req: express.Request, res: express.Response) => {
    // console.log(req.query); http://localhost:3000/placeholder?&width=444&height=500&red=102&green=100&blue=104
    const width = req.query.width as unknown as string;
    const height = req.query.height as unknown as string;
    const red = req.query.red as unknown as string;
    const green = req.query.green as unknown as string;
    const blue = req.query.blue as unknown as string;
    const check = req.query.check as unknown as string;
    console.log(req.query);
    /*

    This will the output of the image after resizing it for example if the image name = 'hemdan'
    and we want resize it into 200*200 it will be resized and saved with name 'hemdan_200_200.jpg' in the 
    ./assets/thumb folder
      **/
    let outputFile = path.join(
      thumbFolder,
      `placeholder_${width}_${height}_${red}_${green}.jpg`
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
          console.log('The image exists already');
          res.sendFile(outputFile);
        })
        .catch(() =>
          console.error(
            'The image is not exists before, we will generate it now '
          )
        );
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
            .then((info: any) => {
              if (check) {
                res.send(info);
                console.log(info);
              } else {
                res.sendFile(outputFile);
              }
            });
        }
      } catch (e) {
        // catch errors and send error status

        console.log(e);
        res.sendFile(templatePath + '/failure.html');
      }
    })();
  }
);

export default placeholder;
