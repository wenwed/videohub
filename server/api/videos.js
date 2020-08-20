const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('../mysql/mysql.js');
const uploadVideoImg = require('../plugins/uploadVideoImg.js');
const uploadVideoFile = require('../plugins/uploadVideoFile.js');

//验证token端口
const jwt = require('jsonwebtoken');
const jwt_key = require("../config/jwtkey.js").KEYORSECRET;

//上传封面文件
router.post('/poster', async (req, res) => {
  console.log("用户上传头像成功");
  await uploadVideoImg(req, res);
})

//上传视频文件
router.post('/vdfile', async (req, res) => {
  console.log("用户上传头像成功");
  await uploadVideoFile(req, res);
})

//用户添加视频
router.post('/add', async (req, res) => {
  if(!req.headers.admintoken){    //验证是否带有token
    return res.status(401).json({ status: 401, msg: "请登录" });
  }
  if(!req.querystring){    //验证参数是否合法
    return res.status(412).json({ status: 412, msg: "参数错误" });
  }

  jwt.verify(token, jwt_key, async (err, decoded) => {
    if(err){  //非法token
      return res.status(401).json({ status: 401, msg: "请登录" });
    }
    
    let values = [ 
                  res.body.video_poster, 
                  res.body.video_url, 
                  0,                    //播放量
                  res.body.video_title, 
                  res.body.video_descripe, 
                  res.body.video_type, 
                  1,                   //审核状态
                  video_owner, 
                  new Date()
                ];
    await mysql.insertVideo(values)
    .then(result => {
      res.status(200).json({ status: 200, msg: "添加成功" });
    }).catch(err => {
      console.log(err);
      res.status(500).json({ status: 500, msg: "未知错误" });
    })
  })
})

module.exports = router;