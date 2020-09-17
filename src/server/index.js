require('dotenv').config()

const fs = require('fs');
const https = require('https');

const express = require('express');
const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');
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

var corsOptions = {
  origin: 'https://localhost:8080',
  credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SIGNER));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//require('./routes/userRoutes')(app);
userRoutes(app);
processRoutes(app);
replayRoutes(app);
authRoutes(app);

connectDB();

let items = [
  {
    id: 1,
    name: "One"
  },
  {
    id: 2,
    name: "Two"
  }
];

app.get('/', (req, res) => {
  //res.send(JSON.stringify(items));
  res.send(items);
  //res.render('index', { items });
});

const port = 3000;

//app.listen(port, () => console.log("Server running..."));
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, app)
.listen(port, () => console.log(`Server running on port ${port}!`));
