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
const path_1 = __importDefault(require("path"));
const fs_1 = __importStar(require("fs"));
// eslint-disable-next-line import/no-unresolved, import/extensions
const create_1 = __importDefault(require("../utilities/create"));
// eslint-disable-next-line import/no-unresolved, import/extensions
const resize_1 = __importDefault(require("../utilities/resize"));
const imagesFolder = path_1.default.resolve(process.cwd(), './assets/images');
const thumbFolder = path_1.default.resolve(process.cwd(), './assets/thumb');
// eslint-disable-next-line spaced-comment
///// Make sure to  all the files in thumbFolder
fs_1.default.readdir(thumbFolder, (err, files) => {
    if (err)
        throw err;
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
        // eslint-disable-next-line no-shadow
        fs_1.default.unlink(path_1.default.join(thumbFolder, file), err => {
            if (err)
                throw err;
        });
    }
});
// eslint-disable-next-line no-console
// console.log(thumbFolder);
describe('2. Checking The Utilities', () => {
    it('2.1 should return a Generated image', async () => {
        const outputFile = path_1.default.join(thumbFolder, `placeholder_${444}_${500}_${238}_${10}.jpg`);
        await (0, create_1.default)(outputFile, 444, 500, 238, 10, 240);
        /// Check if it was generated and exists
        expect((0, fs_1.existsSync)(outputFile)).toEqual(true);
    });
    it('2.2 should return a resized image', async () => {
        const imagePath = 'santamonica';
        const width = 640;
        const height = 800;
        const outputFile = path_1.default.join(thumbFolder, `${imagePath}_${width}_${height}.jpg`);
        await (0, resize_1.default)(imagesFolder, imagePath, outputFile, width, height);
        /// Check if it was resized and exists
        expect((0, fs_1.existsSync)(outputFile)).toEqual(true);
    });
    it('2.3 should return a false becuase we send it a wrong file', async () => {
        const imagePath = 'ffff';
        const width = 640;
        const height = 800;
        const outputFile = path_1.default.join(thumbFolder, `${imagePath}_${width}_${height}.jpg`);
        (0, resize_1.default)(imagesFolder, imagePath, outputFile, width, height);
        expect((0, fs_1.existsSync)(outputFile)).toEqual(false);
    });
    it('2.4 should return a the number of files in thumbFolder 3 = > Genrated from tests 2.1 2.2 1.1 ', async () => {
        fs_1.default.readdir(thumbFolder, (err, files) => {
            expect(files.length).toEqual(3);
        });
    });
});
