const mysql = require('../mysql/mysql.js');

// let admin = ['wenwd', 'wenwd114514'];
// mysql.insertAdmin(admin);

// let name = ["wenwd"];
// mysql.existAdminName(name)
//   .then(result => {
//     console.log(result[0].count);
//   });

let user = ['wenwd', 'wenwd114514', '114514.jpg', new Date()];

mysql.insertUser(user)
  .then(result => {console.log(result)});