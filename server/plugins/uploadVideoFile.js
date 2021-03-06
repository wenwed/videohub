const fs = require('fs');
const path = require('path');
const formidable = require('formidable');  // 上传文件
const formatTime = require('silly-datetime');  // 格式化数据

module.exports = (req, res) => {
    
    let form = new formidable.IncomingForm();  //创建上传表单
    form.encoding = 'utf-8';  // 设置编码格式
    form.uploadDir = path.join(__dirname, '../static/video'); // 设置上传目录(这个目录必须先创建好)
    form.keepExtensions = true;  // 保留文件后缀名
    form.maxFieldsSize = 1024 * 1024 *1024; // 设置文件大小

    /* 格式化form数据 */
    form.parse(req, (err, fields, files) => {
        let file = files.file;
        /* 获取异常 */
        if(err) {
            return res.status(500).json({'status': 500, result: '服务器内部错误'});
        }
        if(file.size > form.maxFieldsSize) {
            fs.unlink(file.path);
            return res.status(412).json({'status': 412, result: '视频不能超过1G'});
        }

        /* 存储后缀名 */
        let extName = '';
        switch (file.type) {
            case 'video/mp4':
                extName = 'mp4';
                break;
        }
        if(extName.length == 0) {
            return res.status(412).json({'status': 412, result: '只支持mp4格式视频'});
        }
        /* 拼接新的文件名 */
        let time = formatTime.format(new Date(), 'YYYYMMDDHHmmss');
        let num = Math.floor(Math.random() * 8999 + 10000);
        let videoName = `${time}_${num}.${extName}`;
        let newPath = form.uploadDir + '/' + videoName;

        /* 更改名字和路径 */
        fs.rename(file.path, newPath, (err) => {
            if(err) {
                console.log(err);
                return res.status(500).json({'status': 500, result: '视频上传失败'});
            } else {
                return res.send({'status': 200, 'msg': '视频上传成功', video: videoName });
            }
        })
        
    })
};