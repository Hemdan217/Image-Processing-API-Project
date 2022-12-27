/* eslint-disable import/extensions */
/// / Import the main module
import express from 'express';

import path from 'path';

import fs, { promises as fspromises } from 'fs';

// eslint-disable-next-line import/no-unresolved
import create from '../utilities/create';

/// Create Router
const placeholder = express.Router();
/// the path that contains the html files
const templatePath = path.resolve(process.cwd(), './src/public');
const thumbFolder = path.resolve(process.cwd(), './assets/thumb');

placeholder.get(
  '/placeholder',
  (req: express.Request, res: express.Response): void => {
    // console.log(req.query); http://localhost:3000/placeholder?&width=444&height=500&red=102&green=100&blue=104
    const width = req.query.width as string;
    const height = req.query.height as string;
    const red = req.query.red as string;
    const green = req.query.green as string;
    const blue = req.query.blue as string;
    // console.log(req.query);
    /*

    This will the output of the image after resizing it for example if the image name = 'hemdan'
    and we want resize it into 200*200 it will be resized and saved with name 'hemdan_200_200.jpg' in the 
    ./assets/thumb folder
      * */
    const outputFile = path.join(
      thumbFolder,
      `placeholder_${width}_${height}_${red}_${green}.jpg`
    );

    (async (): Promise<void> => {
      let exists = false;
      /*

    let check if the resized image exists already
      * */

      await fspromises
        /// if we can to access it this means that it exists
        .access(outputFile, fs.constants.W_OK)
        .then((): void => {
          exists = true;
          // eslint-disable-next-line no-console
          console.log('The image exists already');
          res.sendFile(outputFile);
        })
        .catch(() =>
          // eslint-disable-next-line no-console
          console.error(
            'The image is not exists before, we will generate it now '
          )
        );
      try {
        if (!exists) {
          // console.log(exists);
          await create(
            outputFile,
            parseInt(width, 10),
            parseInt(height, 10),
            parseInt(red, 10),
            parseInt(green, 10),
            parseInt(blue, 10)
          ).then((): void => {
            res.sendFile(outputFile);
          });
        }
      } catch (e) {
        // catch errors and send error status

        // eslint-disable-next-line no-console
        console.log(e);
        res.sendFile(`${templatePath}/failure.html`);
      }
    })();
  }
);

export default placeholder;
