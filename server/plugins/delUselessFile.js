const mysql = require('../mysql/mysql.js');
const fs = require('fs');
const path = require('path');

modules.exports = {
    delAllUseless: () => {
        let videoFiles = fs.readdirSync(path.resolve(__dirname, "../static/video"));
        for(let videoFile in videoFiles) {
            let value = [ videoFile ];
            mysql.getUseOfVideo(value)
                .then(res => {
                    if(res[0].num === 0) {
                        fs.unlinkSync(path.resolve(__dirname, "../static/video/" + videoFile));
                        console.log("删除闲置图片资源:" + videoFile);
                    }
                })
        }
        let posterFiles = fs.readdirSync(path.resolve(__dirname, "../static/poster"));
    }
}