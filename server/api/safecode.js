const svgCaptcha = require("svg-captcha");
const router = require("express").Router();

//获取验证码
router.get("/getsafecode", (req, res) => {
  const captcha = svgCaptcha.create({
    //字符数量
    size: 4,
    //忽略的字符
    ignoreChars: "o0i1",
    //干扰线个数
    noise: 2,
    // 宽度  
    width: 80,  
    // 高度  
    height: 32
  })
  req.session = captcha.text.toLowerCase();
  console.log(req.session);
  res.cookie('captcha', req.session);
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(String(captcha.data));
  res.end();
})

module.exports = router;