const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const bcrypt = require('bcrypt'); // 👈 記得補上這個，否則註冊會報錯
const db = require('./models/db'); // 引入資料庫

const app = express();

// --- 後端安全設計 1 & 2 & 3 ---
app.use(helmet()); // 安全 Header
app.use(cors());   // 允許跨域連線 (解決你剛才「無法連線」的問題)
app.use(express.json()); // 解析 JSON

// 速率限制：防止暴力破解
// 速率限制：為了 Demo 展示，設定為 1 分鐘內最多 5 次
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 分鐘
  max: 5,                  // 最多 5 次
  message: { error: "請求太頻繁，請稍後再試。" }
});

// 關鍵：確保這行在所有的 app.post 或 app.get 之前
app.use('/api/', limiter);

// --- 註冊 API ---
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  // --- 後端安全設計 4: 輸入驗證 ---
  if (!email || !password || password.length < 8) {
    return res.status(400).json({ error: "資料格式錯誤或密碼太短" });
  }

  try {
    // --- 後端安全設計 5: 防止 SQL 注入 (SQLi) ---
    // ✅ 使用 ? 預留位置進行參數化查詢
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      return res.status(400).json({ error: "該信箱已被註冊" });
    }

    // --- 後端安全設計 6: 密碼雜湊儲存 ---
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 存入資料庫
    await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    res.status(201).json({ message: "註冊成功！" });
  } catch (error) {
    console.error("資料庫錯誤:", error);
    res.status(500).json({ error: "伺服器錯誤，請檢查資料庫連線" });
  }
});

app.get('/', (req, res) => {
  res.send('<h1>安全後端運行中</h1>');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 伺服器啟動：http://localhost:${PORT}`);
});