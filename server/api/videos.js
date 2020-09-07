const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
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

//发送视频封面文件
router.get('/getposter', async (req, res) => {
  if(!req.query.poster)
    return res.status(401).json({ status: 412, msg: "参数错误" });
  const exist = fs.existsSync(path.resolve(__dirname, "../static/videoPoster/" + req.query.poster))
  if(!exist)
  return res.status(401).json({ status: 412, msg: "文件不存在" });
  res.sendFile(path.resolve(__dirname, "../static/videoPoster/" + req.query.poster))
})

//上传视频文件
router.post('/vdfile', async (req, res) => {
  console.log("用户上传头像成功");
  await uploadVideoFile(req, res);
})

//发送视频文件
router.get('/getvideo', async (req, res) => {
  if(!req.query.video)
    return res.status(401).json({ status: 412, msg: "参数错误" });
  const exist = fs.existsSync(path.resolve(__dirname, "../static/video/" + req.query.video))
  if(!exist)
  return res.status(401).json({ status: 412, msg: "文件不存在" });
  res.sendFile(path.resolve(__dirname, "../static/video/" + req.query.video))
})


//用户添加视频
router.post('/add', async (req, res) => {
  if(!req.headers.admintoken){    //验证是否带有token
    return res.status(401).json({ code: 401, msg: "请登录" });
  }

  jwt.verify(token, jwt_key, async (err, decoded) => {
    if(err){  //非法token
      return res.status(401).json({ code: 401, msg: "请登录" });
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
      res.status(200).json({ code: 200, msg: "添加成功" });
    }).catch(err => {
      console.log(err);
      res.status(500).json({ code: 500, msg: "未知错误" });
    })
  })
})

//查询视频信息
router.get('/videoinfo', async (req, res) => {
  if(!req.query.vdid)
    return res.status(412).json({ code: 412, msg: "参数错误" });
  let values = [ req.query.vdid ];
  await mysql.getVideoInfo(values)
    .then(result => {
      res.status(200).json({ code: 200, msg: "查询成功", videoinfo: result });
    }).catch(err => {
      console.log(err)
      res.status(500).json({ code: 500, msg: "未知错误" });
    })
})

//用户修改视频信息
router.post('/add', async (req, res) => {
  if(!req.headers.admintoken){    //验证是否带有token
    return res.status(401).json({ code: 401, msg: "请登录" });
  }

  jwt.verify(token, jwt_key, async (err, decoded) => {
    if(err){  //非法token
      return res.status(401).json({ code: 401, msg: "请登录" });
    }
    
    let values = [ 
      res.body.video_poster, 
      res.body.video_url, 
      res.body.video_title, 
      res.body.video_descripe, 
      res.body.video_type, 
      res.body.VDID
    ];
    await mysql.updateVideo(values)
      .then(result => {
        res.status(200).json({ code: 200, msg: "添加成功" });
      }).catch(err => {
        console.log(err);
        res.status(500).json({ code: 500, msg: "未知错误" });
      })
  })
})

//用户删除视频
router.post('/del', async (req, res) => {
  if(!req.headers.admintoken){    //验证是否带有token
    return res.status(401).json({ code: 401, msg: "请登录" });
  }

  jwt.verify(token, jwt_key, async (err, decoded) => {
    if(err){  //非法token
      return res.status(401).json({ code: 401, msg: "请登录" });
    }

    let values = [ req.body.VDID ];
    await mysql.deleteVideo(values)
      .then(result => {
        res.status(200).json({ code: 200, msg: "删除成功" });
      }).catch(err => {
        res.status(500).json({ code: 500, msg: "未知错误" });
      })
  })
})

//用户全部的视频列表
router.get('/person/all', async (req, res) => {
  if(!req.headers.admintoken){    //验证是否带有token
    return res.status(401).json({ code: 401, msg: "请登录" });
  }
  if(!req.query.id){    //验证参数是否合法
    return res.status(412).json({ code: 412, msg: "参数错误" });
  }
  jwt.verify(token, jwt_key, async (err, decoded) => {
    if(err){  //非法token
      return res.status(401).json({ code: 401, msg: "请登录" });
    }

    let values = [ req.query.id ];
    await mysql.getAllUserVideo(values)
      .then(result => {
        res.status(200).json({ code: 200, msg: "查询成功", videolist: result });
      }).catch(err => {
        res.status(500).json({ code: 500, msg: "未知错误" });
      })
  })
})

//用户通过审核的全部视频
router.get('/person/passed', async (req, res) => {
  if(!req.query.id){    //验证参数是否合法
    return res.status(412).json({ code: 412, msg: "参数错误" });
  }
  let values = [ req.query.id ]
    await mysql.getReviewedUserVideo(values)
    .then(result => {
      res.status(200).json({ code: 200, msg: "查询成功", videolist: result });
    }).catch(err => {
      res.status(500).json({ code: 500, msg: "未知错误" });
    })
})

//查询某个视频的审核状态
router.get('/video/status', async (req, res) => {
  if(!req.query.vdid)
    return res.status(412).json({ code: 412, msg: "参数错误" });
  let values = [ req.query.vdid ];
  await mysql.getVideoStatus(values)
    .then(result => {
      res.status(200).json({ code: 200, msg: "查询成功", vdid: req.query.vdid, status: result[0].video_status });
    }).catch(err => {
      res.status(500).json({ code: 500, msg: "未知错误" });
    })
})

//全站排行
router.get('/rank/all', async (req, res) => {
  if(!req.query.index||!req.query.pnum||!req.query.date){    //验证参数是否合法
    return res.status(412).json({ code: 412, msg: "参数错误" });
  }
  let date = new Date().getTime()
  if(req.query.date === "-1"){
    date = new Date("2000-01-01")
  }else{
    date = new Date(date - 60*60*24*1000*req.query.date)
  }
  let values = [ date, (req.query.index-1)*req.query.pnum, req.query.pnum-0 ]
  await mysql.getVideoAllRank(values)
    .then(result => {
      res.status(200).json({ code: 200, msg: "查询成功", videolist: result });
    }).catch(err => {
      res.status(500).json({ code: 500, msg: "未知错误" });
    })
})

//分区排行
router.get('/rank/type', async (req, res) => {
  if(!req.query.index||!req.query.pnum||!req.query.type||!req.query.date){    //验证参数是否合法
    return res.status(412).json({ code: 412, msg: "参数错误" });
  }
  let date = new Date().getTime()
  if(req.query.date === "-1"){
    date = new Date("2000-01-01")
  }else{
    date = new Date(date - 60*60*24*1000*req.query.date)
  }
  let values = [ date, req.query.type-0, (req.query.index-1)*req.query.pnum, req.query.pnum-0 ]
  console.log(values)
  await mysql.getVideoTypeRank(values)
    .then(result => {
      res.status(200).json({ code: 200, msg: "查询成功", videolist: result });
    }).catch(err => {
      res.status(500).json({ code: 500, msg: "未知错误" });
    })
})

module.exports = router;