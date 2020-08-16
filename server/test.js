const bcrypt = require('bcryptjs');

function getBcrypt(password){
  //生成salt的迭代次数
  const saltRounds = 10;
  //随机生成salt
  const salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}
let a = "dww114514"
let b = getBcrypt(a);
let flag = bcrypt.compareSync(a,b);
console.log(flag);