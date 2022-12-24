//// Importing the main modules
import express from "express";
const bodyParser = require("body-parser");

//// Import the main two endpoins
import upload from "./routers/upload";
import mainRouter from "./routers/main";

//// Create Instance of exprss
const app = express();
//// URLEncoded Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
const port: number = (process.env.PORT as unknown as number) || 3000;

app.use(mainRouter);
app.use(upload);

app.listen(port, (): void => {
  console.log(`The Server is Working on port ${port}`);
});
