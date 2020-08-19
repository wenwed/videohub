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

// let user = ['wenwd1', 'wenwd114514', '114514.jpg', new Date()];

// mysql.insertUser(user)
//   .then(result => {console.log(result)});

// let videotypes = ["生活区","生活中的趣事"];

// mysql.insertVideoType(videotypes)
//   .then(result => {
//     console.log(result);
//   })

// let video = ["114514.jpg","1919810.mp4",250,"视频","第十一个视频",1,2,1,new Date()];
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