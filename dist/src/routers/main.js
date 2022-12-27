"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// / Import the main module
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importStar(require("fs"));
// eslint-disable-next-line import/no-unresolved, import/extensions
const resize_1 = __importDefault(require("../utilities/resize"));
/// Create Router
const mainRouter = express_1.default.Router();
/// the path that contains the html files
const templatePath = path_1.default.resolve(process.cwd(), './src/public');
const imagesFolder = path_1.default.resolve(process.cwd(), './assets/images');
const thumbFolder = path_1.default.resolve(process.cwd(), './assets/thumb');
mainRouter.get('/api', (req, res) => {
    // console.log(req.query); http://localhost:3000/api?path=image&width=4444&height=500
    const imagePath = req.query.path;
    const width = req.query.width;
    const height = req.query.height;
    /*
  
      This will the output of the image after resizing it for example if the image name = 'hemdan'
      and we want resize it into 200*200 it will be resized and saved with name 'hemdan_200_200.jpg' in the
      ./assets/thumb folder
        * */
    const outputFile = path_1.default.join(thumbFolder, `${imagePath}_${width}_${height}.jpg`);
    (async () => {
        let exists = false;
        /*
    
        let check if the resized image exists already
          * */
        await fs_1.promises
            /// if we can to access it this means that it exists
            .access(outputFile, fs_1.default.constants.W_OK)
            .then(() => {
            exists = true;
            // eslint-disable-next-line no-console
            console.log('The image exists already');
            res.sendFile(outputFile);
        })
            .catch(() => 
        // eslint-disable-next-line no-console
        console.error('The image is not exists before, it will resized now '));
        try {
            if (!exists) {
                await (0, resize_1.default)(imagesFolder, imagePath, outputFile, parseInt(width, 10), parseInt(height, 10)).then(() => {
                    res.sendFile(outputFile);
                });
            }
        }
        catch (e) {
            // catch errors and send error status
            // eslint-disable-next-line no-console
            console.log(e);
            res.sendFile(`${templatePath}/failure.html`);
        }
    })();
});
exports.default = mainRouter;
