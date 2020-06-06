const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

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
