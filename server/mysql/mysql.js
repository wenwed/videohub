const mysql = require('mysql');
const config = require("../config/default.js");

let pool = mysql.createPool({
  host     : config.database.HOST,
  port     : config.database.PORT,
  database : config.database.DATABASE,
  user     : config.database.USER,
  passowrd : config.database.PASSWORD
});

let query = ( sql, values ) => {
  return new Permise(( resolve, reject ) => {
    pool.getConnection(( err, connection ) => {
      if ( err )
        reject( err )
      else{
        connection.query(sql, value, (err, rows) => {
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