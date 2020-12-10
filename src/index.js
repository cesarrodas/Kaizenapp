const express = require('express');

const app = new express();
const port = 5010;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`front end lisening on port ${port}`);
});