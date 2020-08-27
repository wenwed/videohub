const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('../mysql/mysql.js');

//验证token端口
const jwt = require('jsonwebtoken');
const jwt_key = require("../config/jwtkey.js").KEYORSECRET;

//获取全部视频标签
router.get('/all', async (req, res) => {
  await mysql.getAllVideoTypes()
    .then(result => {
      res.status(200).json({ status: 200, msg: "查询成功", videotypes: result });
    }).catch(err => {
      console.log(err);
      res.status(412).json({ status: 412, msg: "未知错误" });
    })
})

//获取单个视频标签
router.get('/one', async (req, res) => {
  if(!req.query.id){
    res.status(412).json({ status: 412, msg: "参数错误" });
  }
  let values = [ req.query.id ]
  await mysql.getOneVideoTypes( values )
    .then(result => {
      res.status(200).json({ status: 200, msg: "查询成功", videotype: result });
    }).catch(err => {
      console.log(err);
      res.status(412).json({ status: 412, msg: "未知错误" });
    })
})

//添加视频标签
router.post('/add', async (req, res) => {
  if(!req.headers.admintoken){    //验证是否带有token
    return res.status(401).json({ status: 401, msg: "没有token，请登录" });
  }

  let token = req.headers.admintoken;
  jwt.verify(token, jwt_key, async (err, decoded) => {
    if(err){  //非法token
      return res.status(401).json({ status: 401, msg: "token错误，请登录" });
    }
    
    let values = [ req.body.type_tag, req.body.type_descripe ];
    await mysql.insertVideoType(values)
    .then(result => {
      res.status(200).json({ status: 200, msg: "添加成功" });
    }).catch(err => {
      console.log(err);
      res.status(500).json({ status: 500, msg: "未知错误" });
    })
  })
})

//修改视频标签
router.post('/update', async (req, res) => {
  if(!req.headers.admintoken){    //验证是否带有token
    return res.status(401).json({ status: 401, msg: "没有token，请登录" });
  }

  let token = req.headers.admintoken;
  jwt.verify(token, jwt_key, async (err, decoded) => {
    if(err){  //非法token
      console.log(err)
      return res.status(401).json({ status: 401, msg: "token错误，请登录" });
    }
    
    let values = [ req.body.type_tag, req.body.type_descripe, req.body.VTID ];
    await mysql.updateVideoType(values)
    .then(result => {
      res.status(200).json({ status: 200, msg: "更新成功" });
    }).catch(err => {
      console.log(err);
      res.status(500).json({ status: 500, msg: "未知错误" });
    })
  })
})

//删除视频标签
router.post('/delete', async (req, res) => {
  if(!req.headers.admintoken){    //验证是否带有token
    return res.status(401).json({ status: 401, msg: "请登录" });
  }

  jwt.verify(token, jwt_key, async (err, decoded) => {
    if(err){  //非法token
      return res.status(401).json({ status: 401, msg: "请登录" });
    }
    
    let values = [ req.body.VTID ];
    await mysql.deleteVideoType(values)
    .then(result => {
      res.status(200).json({ status: 200, msg: "删除成功" });
    }).catch(err => {
      console.log(err);
      res.status(500).json({ status: 500, msg: "未知错误" });
    })
  })
})

module.exports = router;