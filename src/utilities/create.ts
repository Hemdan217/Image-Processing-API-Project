const sharp = require('sharp');

type dataFormat = {
  format: string;
  width: number;
  height: number;
  channels: number;
  premultiplied: boolean;
  size: number;
};
async function create(
  outputFile: string,
  width: number,
  height: number,
  red: number,
  green: number,
  blue: number
): Promise<void> {
  await sharp({
    create: {
      width: width || 500,
      height: height || 500,
      channels: 4,
      background: {
        r: red || 238,
        g: green || 238,
        b: blue || 238,
        alpha: 0.5,
      },
    },
  })
    .toFile(outputFile)
    .then((info: dataFormat): void => {
      // eslint-disable-next-line no-console
      console.log(info);
    });
}

export default create;
