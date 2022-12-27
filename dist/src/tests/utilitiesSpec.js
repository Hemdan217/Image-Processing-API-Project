"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
// eslint-disable-next-line import/no-unresolved, import/extensions
const create_1 = __importDefault(require("../utilities/create"));
// import resize from '../utilities/resize';
const thumbFolder = path_1.default.resolve(process.cwd(), './assets/thumb');
// eslint-disable-next-line no-console
console.log(thumbFolder);
const outputFile = path_1.default.join(thumbFolder, `placeholder_${444}_${500}_${238}_${10}.jpg`);
describe('convertImage util', () => {
    it('should return a resized image', async () => {
        await (0, create_1.default)(outputFile, 444, 500, 238, 10, 240);
        expect((0, fs_1.existsSync)(outputFile)).toEqual(true);
        // expect(image).toContain('fjord-200x200.jpg');
    });
});
// fdescribe('1. Test endpoint responseshhhhhhhhhhhhhhhhh', () => {
//   it('1.1 gets the placeholder endpoint', async (): Promise<void> => {
//     // eslint-disable-next-line no-unused-vars
//     try {
//       let exists: boolean = false;
//       await .then(() => {
//         // eslint-disable-next-line no-console
//         fspromises
//           /// if we can to access it this means that it exists
//           .access(outputFile, fs.constants.W_OK)
//           .then((): void => {
//             exists = true;
//           })
//           .catch(() =>
//             // eslint-disable-next-line no-console
//             console.log('The image is not exists before, it will resized now ')
//           );
//       });
//       expect(exists).toBe(true);
//     } catch {
//       // eslint-disable-next-line no-console
//       console.log('err');
//     }
//   });
//   it('1.1 gets the placeholder endpkkkkkkkkkkkkoint', () => {
//     expect(5 * 5).toBe(25);
//   });
// });
