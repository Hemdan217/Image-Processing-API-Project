const sharp = require('sharp');

type dataFormat = {
  format: string;
  width: number;
  height: number;
  channels: number;
  premultiplied: boolean;
  size: number;
};

async function resize(
  imagesFolder: string,
  imagePath: string,
  outputFile: string,
  width: number,
  height: number
): Promise<void> {
  await sharp(`${imagesFolder}/${imagePath}.jpg`)
    /// / if the client did't provide the width and height , the image will be resized into 300*300
    .resize(width || 300, height || 300)
    .toFile(outputFile)
    .then((info: dataFormat): void => {
      // eslint-disable-next-line no-console
      console.log(info);
    });
  // .then((err: string) => err)
}

export default resize;
