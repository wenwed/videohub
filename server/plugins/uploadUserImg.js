const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const formatTime = require('silly-datetime');
const Jimp = require('jimp');

module.exports = (req, res) => {
  let form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../static/userPoster');
  form.encoding = 'utf-8';
  form.keepExtensions = true;
  form.maxFieldsSize = 5 * 1024 * 1024;

  form.parse(req, (err, fields, files) => {
    let file = files.file;

    if(err){
      console.log("服务器内部错误");
      return res.status(500).json({ status: 500, msg: "服务器内部错误" });
    }
    if(file.size > form.maxFieldsSize){
      console.log("图片大小不能超过5M");
      fs.unlink(file.path);
      return res.status(412).json({ status: 412, msg: "图片大小不能超过5M" });
    }

    let extName = "";
    switch(file.type){
      case 'image/png':
        extName = "png";
        break;
      case 'image/x-png':
        extName = "png";
        break;
      case 'image/jpg':
        extName = "jpg";
        break;
      case 'image/jpeg':
        extName = "jpg";
        break;
    }

    if(extName.length === 0){
      console.log("只支持上传png或jpg格式的图片");
      return res.status(412).json({ status: 412, msg: "只支持上传png或jpg格式的图片" });
    }

    let time = formatTime.format(new Date(), "YYYYMMDDHHmmss");
    let num = Math.floor(Math.random() * 8999 + 10000);
    let imgName = `u_${time}_${num}.${extName}`;
    let newPath = form.uploadDir + '/' + imgName;

    Jimp.read(file.path, (err, poster) => {
      if(err){
        console.log(err);
      }
      poster
          .resize(256, 256)     //设置图片大小
          .quality(60)          //设置为jepg
          .write(newPath);      //保存
      return res.status(200).json({ status: 200, msg: "图片上传成功", poster: imgName });
    });
  })
}