/**
 * Bruger mysql's createPool til at skabe og opretholde connections med
 */
const dotenv = require('dotenv');
dotenv.config();

// module.exports = (function() {
//     const mysql = require("mysql");
//     return () => 
//       mysql.createPool({
//         connectionLimit: 10,
//         host: process.env.DB_HOST || "localhost",
//         user: process.env.DB_USER || "root",
//         password: process.env.DB_PSWD || "root",
//         database: process.env.DB_DTBS || "test",
//         // host: process.env.DB_HOST || "sql.itcn.dk",
//         // user: process.env.DB_USER || "mich655r.SKOLE",
//         // password: process.env.DB_PSWD || "Thh3hRT608",
//         // database: process.env.DB_DTBS || "mich655r2.SKOLE",
//         port: 3306
//       });
//   })();
module.exports = (function() {
    const mysql = require("mysql");
    return () => 
      mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PSWD || "root",
        database: process.env.DB_DTBS || "test",
        port: 3306
      });
  })();
  