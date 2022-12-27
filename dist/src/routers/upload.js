"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const upload = express_1.default.Router();
const templatePath = path_1.default.resolve(process.cwd(), './src/');
upload.get('/upload', (req, res) => {
    res.sendFile(`${templatePath}/public/upload.html`);
});
upload.post('/upload', (req, res) => {
    // console.log(req.body);
    /** { img: 'palmtunnel.jpg', width: '500', height: '500' }* */
    const height = parseInt(req.body.height, 10);
    const width = parseInt(req.body.width, 10);
    const seletedImage = req.body.img;
    // console.log(height, width);
    /// after getting the image from the server , redirect to api
    res.redirect(`/api?path=${seletedImage.slice(0, seletedImage.length - 4)}&width=${width}&height=${height}`);
});
exports.default = upload;
