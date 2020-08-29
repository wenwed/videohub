const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mysql = require('../mysql/mysql.js');

//验证token端口
const jwt = require('jsonwebtoken');
const jwt_key = require("../config/jwtkey.js").KEYORSECRET;

//查询管理员姓名是否被占用
router.get('/nameuse', async (req, res) => {
  if(!req.query.name){    //验证参数是否正确
    return res.status(412).json({ status: 412, msg: "参数错误" });
  }

  let values = [ req.query.name ];
  await mysql.existAdminName(values)
    .then(result => {
      if(result[0].count != 0){
        res.status(200).json({ status: 200, msg: "该姓名已被占用", flag: true });
      }else{
        res.status(200).json({ status: 200, msg: "该姓名未被占用", flag: false });
      }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ status: 500, msg: "服务器内部错误" });
  })
})

//管理员注册
router.post('/register', async (req, res) => {
  let password = getBcrypt( req.body.admin_password) ;
  let values = [ req.body.admin_name, password ];
  await mysql.insertAdmin(values)
    .then(result => {
      res.status(200).json({ status: 200, msg: "注册成功", ADID: result.insertId });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ status: 500, msg: "未知错误" });
  })
})

//管理员登陆
router.post('/login', async (req, res) => {
  let values = [ req.body.ADID ];
  await mysql.getAdminById(values)
    .then(result => {
      let passFlag = bcrypt.compareSync(req.body.admin_password, result[0].admin_password);
      if(passFlag){
        //签发token
        let adminToken = jwt.sign({
              id: req.body.ADID,
              role: "admin"
              }, jwt_key, { 
              expiresIn: '7d'       //设置token过期时间
            })
        res.status(200).json({ 
                    status: 200, 
                    msg: "登陆成功", 
                    flag: passFlag, 
                    token: adminToken, 
                    admin: { 
                      ADID: result[0].ADID, 
                      admin_name: result[0].admin_name
                    }});
      }else{
        res.status(200).json({ status: 200, msg: "密码错误", flag: passFlag });
      }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ status: 500, msg: "未知错误" });
  })
})

//获取未审核的视频
router.get('/revideolist', async (req, res) => {
  if(!req.headers.admintoken){    //验证是否带有token
    return res.status(401).json({ status: 401, msg: "没有token，请登录" });
  }

  let token = req.headers.admintoken;
  jwt.verify(token, jwt_key, async (err, decoded) => {
    if(err){  //非法token
      return res.status(401).json({ status: 401, msg: "token错误，请登录" });
    }
    await mysql.getUnreviewVideo()
      .then(result => {
        res.json({ status: 200, videolist: result });
    }).catch(err => {
      console.log(err);
      res.status(500).json({ status: 500, msg: "未知错误" });
    })
  })
})

//添加视频审核结果
router.post('/revideo', async (req, res) => {
  if(!req.headers.admintoken){    //验证是否带有token
    return res.status(401).json({ status: 401, msg: "请登录" });
  }

  let token = req.headers.admintoken;
  jwt.verify(token, jwt_key, async (err, decoded) => {
    if(err){  //非法token
      return res.status(401).json({ status: 401, msg: "请登录" });
    }
    
    let values = [ req.body.video_status, req.body.VDID ];
    await mysql.updateVideoStatus(values)
    .then(result => {
      res.json({ status: 200, msg: "审核成功" });
    }).catch(err => {
      console.log(err);
      res.status(500).json({ status: 500, msg: "未知错误" });
    })
  })
})

//对密码进行加密
function getBcrypt(password){
  //生成salt的迭代次数
  const saltRounds = 10;
  //随机生成salt
  const salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}

module.exports = router;