require('dotenv').config()

const fs = require('fs');
const https = require('https');

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
import { connectDB } from './connect-db';
import mongoose from 'mongoose';
import cors from 'cors';

import { userRoutes } from './routes/userRoutes';
import { processRoutes } from './routes/processRoutes';
import { replayRoutes } from './routes/replayRoutes';
import { authRoutes } from './routes/authRoutes';

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const app = express();

let corsOptions;

if(process.env.NODE_ENV == "production"){
  corsOptions = {
    origin: process.env.SERVER_CORS_ORIGIN_PROD,
    credentials: true
  }
} else if (process.env.NODE_ENV == "development"){
  corsOptions = {
    origin: process.env.SERVER_CORS_ORIGIN_DEV,
    credentials: true
  }
}

app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SIGNER));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

userRoutes(app);
processRoutes(app);
replayRoutes(app);
authRoutes(app);

connectDB();

if(process.env.NODE_ENV == "production"){
  const port = Number(process.env.SERVER_PRODUCTION_PORT);
  app.listen(port, () => {
    console.log(`Production server listening on port ${port}`);
  });
} else {
  const port = Number(process.env.SERVER_DEVELOPMENT_PORT);
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
  }, app)
  .listen(port, () => console.log(`Server running on port ${port}!`));
}
