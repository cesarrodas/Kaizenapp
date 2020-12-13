const express = require('express');
const env = require('dotenv').config();

const app = new express();
let port;

if(process.env.NODE_ENV == "development"){
  port = Number(env.parsed.FRONT_DEVELOPMENT_PORT);
} else if (process.env.NODE_ENV == "production") {
  port = Number(env.parsed.FRONT_PRODUCTION_PORT);
}

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`front end listening on port ${port}`);
});