const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const mysql = require('../mysql/mysql.js');
const delUseless = require('../plugins/delUselessFile.js');

//验证token端口
const jwt = require('jsonwebtoken');
const jwt_key = require("../config/jwtkey.js").KEYORSECRET;

const uploadUserImg = require('../plugins/uploadUserImg');

//上传头像文件
router.post('/poster', async (req, res) => {
  console.log("用户上传头像成功");
  await uploadUserImg(req, res);
})

//发送图像图片
router.get('/getposter', async (req, res) => {
  if (!req.query.poster)
    return res.status(401).json({ code: 412, msg: "参数错误" });
  const exist = fs.existsSync(path.resolve(__dirname, "../static/userPoster/" + req.query.poster))
  if (!exist)
    return res.status(401).json({ code: 412, msg: "文件不存在" });
  res.sendFile(path.resolve(__dirname, "../static/userPoster/" + req.query.poster))
})

//查询姓名是否被占用
router.get('/nameuse', async (req, res) => {
  if (!req.query.name) {    //验证参数是否正确
    return res.status(412).json({ code: 412, msg: "参数错误" });
  }

  let values = [req.query.name];
  await mysql.existUserName(values)
    .then(result => {
      if (result[0].count != 0) {
        res.status(200).json({ code: 200, msg: "该姓名已被占用", flag: true });
      } else {
        res.status(200).json({ code: 200, msg: "该姓名未被占用", flag: false });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({ code: 500, msg: "服务器内部错误" });
    })
})

//用户注册
router.post('/register', async (req, res) => {
  let password = getBcrypt(req.body.user_password);
  let values = [req.body.user_name, password, "default.jpg", new Date()];
  await mysql.insertUser(values)
    .then(result => {
      res.status(200).json({ code: 200, msg: "注册成功", USID: result.insertId });
    }).catch(err => {
      console.log(err);
      res.status(500).json({ code: 500, msg: "未知错误" });
    })
})

//用户登录
router.post('/login', async (req, res) => {
  let values = [req.body.user_name]
  await mysql.getUserPassword(values)
    .then(result => {
      let passFlag = bcrypt.compareSync(req.body.user_password, result[0].user_password);
      if (passFlag) {
        //生成token
        let userToken = jwt.sign({
          id: result[0].USID,
          role: "user"
        }, jwt_key, {
          expiresIn: '7d'       //设置token过期时间
        });
        res.status(200).json({
          code: 200,
          msg: "登陆成功",
          flag: passFlag,
          token: userToken,
          user: {
            USID: result[0].USID,
            user_name: result[0].user_name,
            user_poster: result[0].user_poster,
            register_date: result[0].register_date,
            user_descripe: result[0].user_descripe
          }
        });
      } else {
        res.status(500).json({ code: 500, msg: "账号或密码错误", flag: passFlag });
      }
    }).catch(err => {
      console.log(err)
      res.status(500).json({ code: 500, msg: "账号或密码错误", flag: passFlag });
    })
})

//查询用户信息
router.get('/userinfo', async (req, res) => {
  if (!req.query.usid)
    return res.status(412).json({ code: 412, msg: "参数错误" });
  let values = [req.query.usid];
  await mysql.getUserInfo(values)
    .then(result => {
      res.status(200).json({ code: 200, msg: "查询成功", userinfo: result });
    }).catch(err => {
      console.log(err)
      res.status(500).json({ code: 500, msg: "未知错误" });
    })
})

//用户修改密码
router.post('/updatepass', async (req, res) => {
  if (!req.headers.usertoken) {    //验证是否带有token
    return res.status(401).json({ code: 401, msg: "请登录" });
  }

  let token = req.headers.usertoken;
  jwt.verify(token, jwt_key, async (err, decoded) => {
    if (err) {  //非法token
      return res.status(401).json({ code: 401, msg: "请登录" });
    }
    let values = [decoded.id];
    await mysql.getUserPassword(values)
      .then(result => {
        let passFlag = bcrypt.compareSync(req.body.old_password, result[0].user_password);
        if (passFlag) {
          let values = [req.body.new_password, req.body.USID];
          return mysql.updateUserPassword(values)
        } else {
          res.status(500).json({ code: 500, msg: "密码错误", flag: passFlag });
        }
      })
      .then(result => {
        res.status(200).json({ code: 200, msg: "修改成功", flag: true });
      }).catch(err => {
        console.log(err)
        res.status(500).json({ code: 500, msg: "未知错误" });
      })
  })
})

//用户信息修改
router.post('/updateinfo', async (req, res) => {
  if (!req.headers.usertoken) {    //验证是否带有token
    return res.status(401).json({ code: 401, msg: "请登录" });
  }

  let token = req.headers.usertoken;
  jwt.verify(token, jwt_key, async (err, decoded) => {
    if (err) {  //非法token
      return res.status(401).json({ code: 401, msg: "请登录" });
    }
    let values = [req.body.user_name, req.body.user_poster, req.body.user_descripe, decoded.id];
    await mysql.updateUserInfo(values)
      .then(result => {
        let values = [decoded.id];
        return mysql.getUserInfo(values);
      })
      .then(result => {
        delUseless.delAllUseless();
        res.status(200).json({ code: 200, msg: "修改成功", flag: true, userinfo: result });
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ code: 500, msg: "未知错误" });
      })
  })
})

//对密码进行加密
function getBcrypt(password) {
  //生成salt的迭代次数
  const saltRounds = 10;
  //随机生成salt
  const salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}

module.exports = router;