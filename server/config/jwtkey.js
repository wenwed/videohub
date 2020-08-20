//jwt密钥
const fs = require('fs');
const path = require('path');
const key = fs.readFileSync(path.resolve(__dirname, './jwtkey.pem'));

module.exports = {
  "KEYORSECRET": key
}