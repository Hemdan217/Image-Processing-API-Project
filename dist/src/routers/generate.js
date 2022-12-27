"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const generate = express_1.default.Router();
const templatePath = path_1.default.resolve(process.cwd(), './src/');
generate.get('/generate', (req, res) => {
    res.sendFile(`${templatePath}/public/generate.html`);
});
generate.post('/generate', (req, res) => {
    // console.log(req.body);
    /**  {width: '500',
    height: '500',
    red: '230',
    green: '230',
    blue: '230'}* */
    const width = parseInt(req.body.width, 10);
    const height = parseInt(req.body.height, 10);
    const red = parseInt(req.body.red, 10);
    const green = parseInt(req.body.green, 10);
    const blue = parseInt(req.body.blue, 10);
    /// after getting the image from the server , redirect to placeholder
    res.redirect(`/placeholder??&width=${width}&height=${height}&red=${red}&green=${green}&blue=${blue}`);
});
exports.default = generate;
