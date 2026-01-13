// src/models/db.js
const mysql = require('mysql2');

// 建立資料庫連線池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      // 你的資料庫帳號 (通常是 root)
  password: '',      // 你的資料庫密碼
  database: 'secure_member_db',
  waitForConnections: true,
  connectionLimit: 10
});

// 使用 promise 版本的 API，方便使用 async/await
module.exports = pool.promise();