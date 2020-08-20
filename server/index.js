const express = require('express');
const app = express();
const config = require('./config/default.js');
const port = config.port;
const path = require('path');

require('./plugins/http.js')(app);    //设置跨域

const admin = require('./api/admins.js');
const user = require('./api/users.js');
const videotype = require('./api/videotypes');
const video = require('./api/videos');
app.use('/api/admin', admin);
app.use('/api/user', user);
app.use('/tyvideo', videotype);
app.use('/video', video);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './static/view/404.html'));
});

app.listen(port, ()=>{
  console.log(`App is listening on port ${port}`);
});