const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const db = require('./models/db'); // 引入資料庫

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // --- 安全設計 5: 防止 SQL 注入 (SQLi) ---
    // ✅ 正確做法：使用 ? 作為預留位置，這就是「參數化查詢」
    // 絕對不要使用 `SELECT * FROM users WHERE email = '${email}'` 這種寫法
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      return res.status(400).json({ error: "該信箱已被註冊" });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 存入資料庫 (同樣使用參數化查詢)
    await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    res.status(201).json({ message: "註冊成功！" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});