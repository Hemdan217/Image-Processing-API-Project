//// Importing the main modules
import express from "express";
const bodyParser = require("body-parser");
// const open = require("open");

//// Import the main two endpoins
import mainRouter from "./routers/main";
import placeholder from "./routers/placeholder";
import upload from "./routers/upload";
import generate from "./routers/generate";

//// Create Instance of exprss
const app = express();
//// URLEncoded Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
const port: number = (process.env.PORT as unknown as number) || 3000;

app.use(mainRouter);
app.use(placeholder);
app.use(upload);
app.use(generate);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, (): void => {
  console.log(`The Server is Working on port ${port}`);
  // open("http://localhost:3000/");
});
export default app;
