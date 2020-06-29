require('dotenv').config()

const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
import { connectDB } from './connect-db';
import mongoose from 'mongoose';
import { userRoutes } from './routes/userRoutes';
import { processRoutes } from './routes/processRoutes';

mongoose.set('useFindAndModify', false);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//require('./routes/userRoutes')(app);
userRoutes(app);
processRoutes(app);

connectDB();
let db = mongoose.connection;
db.on('error', (err) => {console.log("error: ", err)});
db.once('open', () => {
  console.log("connection opened");
});

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
