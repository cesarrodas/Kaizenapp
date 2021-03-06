const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = new express();
let port;

console.log("IS THERE PROCESSE ENV", process.env.NODE_ENV);
if(process.env.NODE_ENV == "development"){
  console.log("dev");
  port = Number(process.env.FRONT_DEVELOPMENT_PORT);
} else if (process.env.NODE_ENV == "production") {
  console.log("prod");
  console.log(process.env.FRONT_PRODUCTION_PORT);
  port = Number(process.env.FRONT_PRODUCTION_PORT);
}

console.log("dang address", path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`front end listening on port ${port}`);
});
