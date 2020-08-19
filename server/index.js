const express = require('express');
const app = express();
const config = require("./config/default.js");
const port = config.port;
const path = require('path');

const admin = require('./api/admins.js');
app.use("/api/admin", admin);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "./static/view/404.html"));
});

app.listen(port, ()=>{
  console.log(`App is listening on port ${port}`);
});