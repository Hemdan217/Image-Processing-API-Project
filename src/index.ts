/* eslint-disable import/extensions */
/// /    Importing the main modules
import express from 'express';

// const open = require("open");

/// / Import the main two endpoins
// eslint-disable-next-line import/no-unresolved

// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import bodyParser from 'body-parser';
// eslint-disable-next-line import/no-unresolved
import mainRouter from './routers/main';
// eslint-disable-next-line import/no-unresolved
import placeholder from './routers/placeholder';
// eslint-disable-next-line import/no-unresolved
import upload from './routers/upload';
// eslint-disable-next-line import/no-unresolved
import generate from './routers/generate';

/// / Create Instance of exprss
const app = express();
/// / URLEncoded Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));
const port: number = (process.env.PORT as unknown as number) || 3000;

app.use(mainRouter);
app.use(placeholder);
app.use(upload);
app.use(generate);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(port, (): void => {
  // eslint-disable-next-line no-console
  console.log(`The Server is Working on port ${port}`);
  // open("http://localhost:3000/");
});
export default app;
