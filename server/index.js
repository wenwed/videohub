const express = require('express');
const app = express();
const config = require('./config/default.js');
const port = config.port;
const bodyParser = require("body-parser");
const path = require('path');

require('./plugins/http.js')(app);    //设置跨域

//中间件
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const admin = require('./api/admins.js');
const user = require('./api/users.js');
const videotype = require('./api/videotypes');
const video = require('./api/videos');
const safecode = require('./api/safecode.js');
app.use('/api/admin', admin);
app.use('/api/user', user);
app.use('/api/tyvideo', videotype);
app.use('/api/video', video);
app.use('/api', safecode);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './static/view/404.html'));
});

app.listen(port, ()=>{
  console.log(`App is listening on port ${port}`);
});