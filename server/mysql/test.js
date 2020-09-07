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

// let video = ["114514.jpg","1919810.mp4",0,"视频","第十三个视频",1,1,1,new Date()];
// mysql.insertVideo(video)
//   .then(result => {
//     console.log(result);
//   })

// let index = 1;
// let pageindex = [(index-1)*10];
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

// let values = [ 5 ];
// mysql.deleteVideoType(values)
//   .then(res => {console.log(res)})

// let values= [ 1 ];
// mysql.getAllUserVideo(values)
//   .then(result => {
//     console.log(result);
//   })

// let values = [ '1' ];
// mysql.selectVideo(values)
//   .then(res => {
//     console.log(res)
//   })

// let query = -1;
// let date = new Date().getTime()
// if(query === -1){
//   date = new Date("2000-01-01")
// }else{
//   date = new Date(date - 60*60*24*1000*query)
// }
// console.log(date)
// let values = [ date, 1, (1-1)*5, 5 ]

// mysql.getVideoAllRank(values)
//   .then(res => {
//     console.log(res)
//   })

// mysql.getVideoTypeRank(values)
// .then(res => {
//   console.log(res)
// })

// let values = [1];
// mysql.getVideoStatus(values)
//   .then(res => {
//     console.log(res[0].video_status)
//   })