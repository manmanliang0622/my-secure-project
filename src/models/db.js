// src/models/db.js
const mysql = require('mysql2');

// 建立資料庫連線池
const pool = mysql.createPool({
  host: 'host.docker.internal', // 👈 這裡一定要這樣改，才能連回 Windows 主機
  user: 'root',
  password: '', 
  database: 'secure_member_db',
  waitForConnections: true,
  connectionLimit: 10
});

// 使用 promise 版本的 API，方便使用 async/await
module.exports = pool.promise();