const mysql = require('../mysql/mysql.js');
const fs = require('fs');
const path = require('path');

modules.exports = {
    delAllUseless: () => {
        let musicFiles = fs.readdirSync(path.resolve(__dirname, "../static/music"));
        let posterFiles = fs.readdirSync(path.resolve(__dirname, "../static/poster"));
    }
}