const mysql = require('../mysql/mysql.js');

// let admin = ['wenwd1', 'wenwd114514'];
// mysql.insertAdmin(admin)
//   .then(res => {
//     console.log(res.insertId);
//   })

// let name = ["wenwd"];
// mysql.existAdminName(name)
//   .then(result => {
//     console.log(result[0].count);
//   });

// let values = ["1"];
// mysql.queryAdminPassword(values)
//   .then(res => {
//     console.log(res[0].admin_password);
//   })

// let user = ['wenwd1', 'wenwd114514', '114514.jpg', new Date()];

// mysql.insertUser(user)
//   .then(result => {console.log(result)});

// let videotypes = ["生活区","生活中的趣事"];

// mysql.insertVideoType(videotypes)
//   .then(result => {
//     console.log(result);
//   })

// let video = ["114514.jpg","1919810.mp4",0,"视频","第十二个视频",1,1,1,new Date()];
// mysql.insertVideo(video)
//   .then(result => {
//     console.log(result);
//   })

// let index = 1;
// let pageindex = [(index-1)*10];
// console.log(pageindex);
// mysql.getVideoRank(pageindex)
//   .then(res => {
//     console.log(res);
//   })

// mysql.getUnreviewVideo()
//   .then(res => {
//     console.log(res);
//   })

// let values = [2,1];
// mysql.updateVideoStatus(values)
//   .then(res => {
//     console.log(res);
//   })

// mysql.getAllVideoTypes()
//   .then(result => {
//     console.log(result);
//   })

let values = [ 5 ];
mysql.deleteVideoType(values)
  .then(res => {console.log(res)})