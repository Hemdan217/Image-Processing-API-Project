"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//// Importing the main modules
const express_1 = __importDefault(require("express"));
const bodyParser = require("body-parser");
// const open = require("open");
//// Import the main two endpoins
const main_1 = __importDefault(require("./routers/main"));
const placeholder_1 = __importDefault(require("./routers/placeholder"));
const upload_1 = __importDefault(require("./routers/upload"));
const generate_1 = __importDefault(require("./routers/generate"));
//// Create Instance of exprss
const app = (0, express_1.default)();
//// URLEncoded Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + "/public"));
const port = process.env.PORT || 3000;
app.use(main_1.default);
app.use(placeholder_1.default);
app.use(upload_1.default);
app.use(generate_1.default);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.listen(port, () => {
    console.log(`The Server is Working on port ${port}`);
    // open("http://localhost:3000/");
});
exports.default = app;
