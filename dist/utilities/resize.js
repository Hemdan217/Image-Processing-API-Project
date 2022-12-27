"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require('sharp');
async function resize(imagesFolder, imagePath, outputFile, width, height) {
    await sharp(`${imagesFolder}/${imagePath}.jpg`)
        /// / if the client did't provide the width and height , the image will be resized into 300*300
        .resize(width || 300, height || 300)
        .toFile(outputFile)
        .then((info) => {
        // eslint-disable-next-line no-console
        console.log(info);
    });
    // .then((err: string) => err)
}
exports.default = resize;
