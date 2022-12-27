/// / Import the main module
import express from 'express';
import path from 'path';
import fs, { promises as fspromises } from 'fs';
// eslint-disable-next-line import/no-unresolved, import/extensions
import resize from '../utilities/resize';

/// Create Router
const mainRouter = express.Router();
/// the path that contains the html files
const templatePath = path.resolve(process.cwd(), './src/public');
const imagesFolder = path.resolve(process.cwd(), './assets/images');
const thumbFolder = path.resolve(process.cwd(), './assets/thumb');

mainRouter.get('/api', (req: express.Request, res: express.Response): void => {
  // console.log(req.query); http://localhost:3000/api?path=image&width=4444&height=500
  const imagePath = req.query.path as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  /*

    This will the output of the image after resizing it for example if the image name = 'hemdan'
    and we want resize it into 200*200 it will be resized and saved with name 'hemdan_200_200.jpg' in the 
    ./assets/thumb folder
      * */
  const outputFile = path.join(
    thumbFolder,
    `${imagePath}_${width}_${height}.jpg`
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
        console.error('The image is not exists before, it will resized now ')
      );
    try {
      if (!exists) {
        await resize(
          imagesFolder,
          imagePath,
          outputFile,
          parseInt(width, 10),
          parseInt(height, 10)
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
});

export default mainRouter;
