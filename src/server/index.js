require('dotenv').config()

const express = require('express');
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
  origin: 'http://localhost:8080',
  credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//require('./routes/userRoutes')(app);
userRoutes(app);
processRoutes(app);
replayRoutes(app);
authRoutes(app);

connectDB();
// let db = mongoose.connection;
// db.on('error', (err) => {console.log("error: ", err)});
// db.once('open', () => {
//   console.log("connection opened");
// });


//const Item = require('./models/Item');
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

app.listen(port, () => console.log("Server running..."));
