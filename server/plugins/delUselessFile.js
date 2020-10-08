const mysql = require('../mysql/mysql.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    delAllUseless: () => {
        let videoFiles = fs.readdirSync(path.resolve(__dirname, "../static/video"));
        for (let videoFile in videoFiles) {
            let value = [videoFile];
            mysql.getUseOfVideo(value)
                .then(res => {
                    if (res[0].num === 0) {
                        fs.unlinkSync(path.resolve(__dirname, "../static/video/" + videoFile));
                        console.log("删除闲置video资源:" + videoFile);
                    }
                })
        }
        let posterFiles = fs.readdirSync(path.resolve(__dirname, "../static/poster"));
        for (let posterFile in posterFiles) {
            let value = [posterFile];
            mysql.getUseOfPoster(value)
                .then(res => {
                    if (res[0].num === 0) {
                        fs.unlinkSync(path.resolve(__dirname, "../static/video/" + posterFile));
                        console.log("删除闲置封面资源:" + posterFile);
                    }
                })
        }
        let avatarFiles = fs.readdirSync(path.resolve(__dirname, "../static/userPoster"));
        for (let avatarFile in avatarFiles) {
            let value = [avatarFile];
            mysql.getUseOfAvatar(value)
                .then(res => {
                    if (res[0].num === 0) {
                        fs.unlinkSync(path.resolve(__dirname, "../static/userPoster/" + avatarFile));
                        console.log("删除闲置头像资源:" + avatarFile);
                    }
                })
        }
    }
}