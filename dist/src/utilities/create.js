"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require('sharp');
async function create(outputFile, width, height, red, green, blue) {
    return sharp({
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
        .then((info) => {
        // eslint-disable-next-line no-console
        console.log(info);
        return info;
    });
}
exports.default = create;
