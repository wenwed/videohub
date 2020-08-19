const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const mysql = require('../mysql/mysql.js');

router.post('/nameuse', async (req, res) => {
  if(req.querystring){
    let values = new Array(req.body.admin_name);
    await mysql.existAdminName(values)
      .then(result => {
        if(result[0].count != 0){
          res.status(200).json({ status: 200, msg: "该姓名已被占用", flag: true });
        }else{
          res.status(200).json({ status: 200, msg: "该姓名未被占用", flag: false });
        }
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ status: 500, msg: "服务器内部错误" });
    })
  }else{
    res.status(412).json({ status: 412, msg: "参数错误" });
  }
})

router.post('/register', async (req, res) => {
  if(req.querystring){
    let password = getBcrypt( req.body.admin_password) ;
    let values = new Array( req.body.admin_name, password );
    await mysql.existAdminName(values)
      .then(result => {
        res.status(200).json({ status: 200, msg: "注册成功", ADID: result.insertId });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ status: 500, msg: "服务器内部错误" });
    })
  }else{
    res.status(412).json({ status: 412, msg: "参数错误" });
  }
})

router.post('/login', async (req, res) => {
  if(req.querystring){
    let values = new Array(req.body.ADID);
    await mysql.existAdminName(values)
      .then(result => {
        res.status(200).json({ status: 200, msg: "注册成功", adminid: result.insertId });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ status: 500, msg: "服务器内部错误" });
    })
  }else{
    res.status(412).json({ status: 412, msg: "参数错误" });
  }
})

function getBcrypt(password){
  //生成salt的迭代次数
  const saltRounds = 10;
  //随机生成salt
  const salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}

module.exports = router;