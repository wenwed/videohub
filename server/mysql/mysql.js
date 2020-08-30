const mysql = require('mysql');
const config = require("../config/default.js");

let pool = mysql.createPool({
  host     : config.database.HOST,
  port     : config.database.PORT,
  database : config.database.DATABASE,
  user     : config.database.USER,
  password : config.database.PASSWORD
});

let query = ( sql, values ) => {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(( err, connection ) => {
      if ( err )
        reject( err )
      else{
        connection.query(sql, values, (err, rows) => {
          if(err)
            reject( err )
          else
            resolve(rows)
          connection.release();
        })
      }
    })
  })
}

let admins = 
  `create table if not exists admins(
   ADID INT NOT NULL AUTO_INCREMENT,
   admin_name VARCHAR(100) NOT NULL,
   admin_password VARCHAR(100) NOT NULL,
   PRIMARY KEY (ADID)
  );`;

let users = 
  `create table if not exists users(
   USID INT NOT NULL AUTO_INCREMENT,
   user_name VARCHAR(100) NOT NULL,
   user_password VARCHAR(100) NOT NULL,
   user_poster VARCHAR(100) NOT NULL,
   register_date DATETIME NOT NULL,
   user_descripe VARCHAR(300),
   PRIMARY KEY (USID)
  );`;

let videos = 
  `create table if not exists videos(
   VDID INT NOT NULL AUTO_INCREMENT,
   video_poster VARCHAR(100) NOT NULL,
   video_url VARCHAR(100) NOT NULL,
   video_num INT NOT NULL,
   video_title VARCHAR(100) NOT NULL,
   video_descripe VARCHAR(300) NOT NULL,
   video_type INT NOT NULL,
   video_status INT NOT NULL,
   video_owner INT NOT NULL,
   video_date DATETIME NOT NULL,
   PRIMARY KEY (VDID)
  );`;

let videoTypes = 
  `create table if not exists videoTypes(
   VTID INT NOT NULL AUTO_INCREMENT,
   type_tag VARCHAR(100) NOT NULL,
   type_descripe VARCHAR(300) NOT NULL,
   PRIMARY KEY (VTID)
  );`;

//创建表
let createTable = ( sql ) => {
  return query( sql, [] );
};

createTable(admins);
createTable(users);
createTable(videos);
createTable(videoTypes);

//查询管理员名称是否已存在
exports.existAdminName = ( values ) => {
  let _sql = "select count(*) as count from admins where admin_name=?;";
  return query( _sql, values );
}

//注册管理员
exports.insertAdmin = ( values ) => {
  let _sql = `insert into admins set admin_name=?,admin_password=?;`;
  return query( _sql, values );
}

//查询管理员密码
exports.getAdminById = ( values ) => {
  let _sql = "select * from admins where ADID=?;";
  return query( _sql, values );
}

//查询用户名称是否已存在
exports.existUserName = ( values ) => {
  let _sql = "select count(*) as count from users where user_name=?;";
  return query( _sql, values );
}

//注册用户
exports.insertUser = ( values ) => {
  let _sql = "insert into users set user_name=?,user_password=?,user_poster=?,register_date=?"
  return query( _sql, values );
}

//查询用户密码
exports.getUserPassword = ( values ) => {
  let _sql = "select * from users where USID=?;";
  return query( _sql, values );
}

//修改用户密码
exports.updateUserPassword = ( values ) => {
  let _sql = "update users set user_password=? where user_name=?;";
  return query( _sql, values );
}

//修改用户信息
exports.updateUserInfo = ( values ) => {
  let _sql = "update users set user_name=?,user_poster=?,user_descripe=? where USID=?;";
  return query( _sql, values );
}

//查询所有的视频标签
exports.getAllVideoTypes = () => {
  let _sql = "select * from VideoTypes;";
  return query( _sql, [] );
}

//查询单个视频标签
exports.getOneVideoTypes = ( values ) => {
  let _sql = "select * from VideoTypes where VTID=?;";
  return query( _sql, values );
}

//创建一个视频标签
exports.insertVideoType = ( values ) => {
  let _sql = "insert into videoTypes set type_tag=?,type_descripe=?;";
  return query( _sql, values );
}

//修改一个视频标签
exports.updateVideoType = ( values ) => {
  let _sql = "update videoTypes set type_tag=?,type_descripe=? where VTID=?;";
  return query( _sql, values );
}

//删除一个视频标签
exports.deleteVideoType = ( values ) => {
  let _sql = "delete from videoTypes where VTID=?;";
  return query( _sql, values );
}

//添加一个视频
exports.insertVideo = ( values ) => {
  let _sql = `insert into videos set video_poster=?,video_url=?,video_num=?,video_title=?,
    video_descripe=?,video_type=?,video_status=?,video_owner=?,video_date=?;`;
  return query( _sql, values );
}

//查询一个视频信息
exports.getVideo = ( values ) => {
  let _sql = `select VDID,video_poster,video_url,video_num,video_title,video_descripe,video_type,
    video_status,video_owner,video_date,type_tag,user_name from videos
    left join users on users.USID=videos.video_owner 
    left join videoTypes on videoTypes.VTID=videos.video_type
    where VDID=?;`;
  return query (_sql, values );
}

//修改一个视频信息
exports.updateVideo = ( values ) => {
  let _sql = `update videos set video_poster=?,video_url=?,video_title=?,video_descripe=?,
            video_type=? where VDID=?;`;
  return query( _sql, values );
}

//删除一个视频信息
exports.deleteVideo = ( values ) => {
  let _sql = "delete from videos where VDID=?;";
  return query( _sql, values );
}

//获取全站某一段时间时间排行榜
exports.getVideoAllRank = ( values ) => {
  let _sql = `select VDID,video_poster,video_url,video_num,video_title,video_descripe,video_type,
    video_status,video_owner,video_date,user_name from videos
    left join users on users.USID=videos.video_owner
    where video_status=2 and video_date>? 
    order by video_num desc 
    limit ?,?;`;
  return query( _sql, values );
}

//获取某分区某一时间段时间的排行榜
exports.getVideoTypeRank = ( values ) => {
  let _sql = `select VDID,video_poster,video_url,video_num,video_title,video_descripe,video_type,
    video_status,video_owner,video_date,user_name from videos
    left join users on users.USID=videos.video_owner
    where video_status=2 and video_date>? and video_type=? 
    order by video_num desc
    limit ?,?;`;
  return query( _sql, values );
}

//获取某一用户上传的全部视频
exports.getAllUserVideo = ( values ) => {
  let _sql = `select VDID,video_poster,video_url,video_num,video_title,video_descripe,video_type,
    video_status,video_owner,video_date,user_name from videos
    left join users on users.USID=videos.video_owner
    where video_owner=?;`;
  return query( _sql, values );
}

//获取某一用户上传的通过审核的全部视频
exports.getReviewedUserVideo = ( values ) => {
  let _sql = `select VDID,video_poster,video_url,video_num,video_title,video_descripe,video_type,
    video_status,video_owner,video_date,user_name from videos
    left join users on users.USID=videos.video_owner
    where video_owner=? and video_status=2;`;
  return query( _sql, values );
}

//获取所有未审核的视频
exports.getUnreviewVideo = () =>{
  let _sql = `select VDID,video_poster,video_url,video_num,video_title,video_descripe,video_type,
    video_status,video_owner,video_date,type_tag,user_name from videos
    left join users on users.USID=videos.video_owner 
    left join videoTypes on videoTypes.VTID=videos.video_type
    where video_status=1 limit 0, 10;`;
  return query( _sql, [] );
}

//修改视频审核状态
exports.updateVideoStatus = ( values ) => {
  let _sql = "update videos set video_status=? where VDID=?;";
  return query( _sql, values );
}