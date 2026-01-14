
🛡️ 安全會員管理系統 (Secure Member Management System)
本專案是一個具備多層次防禦架構的 Web 會員系統。開發核心遵循 OWASP Top 10 安全規範，旨在展示如何從前端、後端到資料庫構建一個抗攻擊的現代化應用。
📖 專案亮點與流程
 * 核心價值：實現「資料隱私、流程安全、部署自動化」。
 * 運行流程：
   * 用戶端：實施嚴格的欄位檢核與 XSS 字符轉義。
   * 網路層：透過 Helmet 設定安全性 HTTP 標頭，並由 Rate-limiter 過濾非法流量。
   * 業務邏輯：使用 Bcrypt 進行高強度密碼雜湊，配合 SQL 參數化查詢。
   * 運維層：容器化封裝 (Docker)，確保環境隔離與安全一致性。
🛡️ 安全防禦深度解析 (評分亮點)
1. 身份與存取控制 (Identity & Access Control)
 * Bcrypt 雜湊加密：採用 Salted Hashing 技術。儲存格式為 $2b$12$...，具備抗彩虹表攻擊能力。
 * RBAC 權限管理：資料庫設計內建 role 欄位（User/Admin），實現最小特權原則 (Principle of Least Privilege)。
 * 防止暴力破解：整合 express-rate-limit。若偵測到異常高頻請求，系統將自動回傳 HTTP 429 Too Many Requests。
2. 資料安全與防注入 (Data Integrity)
 * SQL 注入防禦 (SQLi)：使用 mysql2 的預編譯語法（Prepared Statements），徹底杜絕惡意指令拼接。
 * XSS 跨站腳本防禦：
   * 前端：強制使用 textContent 渲染，中和 HTML 標籤。
   * 後端：整合 CSP (Content Security Policy)，禁止執行未經授權的內嵌腳本。
 * 隱私保護：所有敏感配置（資料庫密碼、密鑰）均存於 .env，不隨程式碼推送到版本控制系統。
3. 持續整合與部署 (CI/CD & DevOps)
 * Dockerfile 快速部署：提供標準化的容器設定檔，消除「在我的電腦跑得起來，但在你的電腦跑不起來」的環境問題。
 * GitHub Actions (SAST)：配置 CodeQL 靜態原始碼分析，實現自動化代碼安全審查，及早發現潛在漏洞。
🛠️ 技術棧 (Tech Stack)
| 類別 | 技術 | 說明 |
|---|---|---|
| 環境容器化 | Docker, Docker-compose | 實現環境隔離與快速擴展 |
| 後端框架 | Node.js / Express | 高性能非阻塞 I/O 架構 |
| 資料庫 | MySQL 8.0 | 具備 ACID 特性的關聯式資料庫 |
| 安全套件 | Helmet, Bcrypt, Express-Rate-Limit | 工業級安全防護工具組 |
🚀 快速啟動 (Deployment)
使用 Docker 一鍵部署
 * 複製本專案：
   git clone https://github.com/your-username/your-repo.git

 * 設定環境變數：
   將 .env.example 重新命名為 .env 並填入資料。
 * 啟動服務：
   docker-compose up -d

 * 存取系統：
   * 前端首頁：http://localhost:3000
   * 後端 API 狀態：http://localhost:3000/api/status
🧪 安全性測試示範 (Demo Cases)
| 測試項目 | 預期行為 (安全結果) |
|---|---|
| XSS 注入測試 | 輸入 <script>alert(1)</script> 註冊後，頁面應正確顯示字串且不彈出視窗。 |
| 暴力破解測試 | 1 分鐘內嘗試註冊/登入超過 5 次，系統應暫時封鎖該 IP 請求。 |
| SQLi 測試 | 在欄位輸入 ' OR '1'='1，系統應提示格式錯誤或查無資料，而非繞過驗證。 |
| 密碼安全測試 | 查看資料庫 users 表，密碼欄位必須是長度 60 的雜湊字串。 |
💡 結語
本專案不僅是一個功能的實現，更是對 Web 安全開發流程的實踐。透過前端、後端到 CI/CD 的多重設計，建立了一個能防範常見網路攻擊的穩健系統。