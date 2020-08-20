const express = require('express');
const app = express();
const config = require('./config/default.js');
const port = config.port;
const path = require('path');

require('./plugins/http.js')(app);    //设置跨域

const admin = require('./api/admins.js');
const user = require('./api/users.js');
app.use('/api/admin', admin);
app.use('/api/user', user);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './static/view/404.html'));
});

app.listen(port, ()=>{
  console.log(`App is listening on port ${port}`);
});