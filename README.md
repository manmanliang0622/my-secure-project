
🛡️ 安全會員管理系統 (Secure Member Management System)
本專案是一個具備多層次防禦架構的 Web 會員系統。開發核心遵循 OWASP Top 10 安全規範，旨在展示如何從前端、後端到資料庫構建一個抗攻擊的現代化應用。
📖 專案亮點與流程
 * 核心價值：實現「資料隱私、流程安全、部署自動化」。
 * 運行流程：
   * 用戶端：實施嚴格的欄位檢核與 XSS 字符轉義。
   * 網絡層：透過 Helmet 設定安全性 HTTP 標頭，並由 Rate-limiter 過濾非法流量。
   * 業務邏輯：使用 Bcrypt 進行高強度密碼雜湊，配合 SQL 參數化查詢。
   * 運維層：容器化封裝 (Docker)，確保環境隔離與安全一致性。
🛡️ 安全防禦深度解析 (評分亮點)
1. 身份與存取控制 (Identity & Access Control)
 * Bcrypt 雜湊加密：採用 Salted Hashing 技術。儲存格式為 $2b$12$...，具備極強的抗彩虹表與暴力破解能力。
 * RBAC 權限管理：資料庫設計內建 role 欄位（User/Admin），實現最小特權原則 (Principle of Least Privilege)。
 * 防止暴力破解：整合 express-rate-limit。若偵測到異常高頻請求，系統將自動回傳 HTTP 429 Too Many Requests。
2. 資料安全與防注入 (Data Integrity)
 * SQL 注入防禦 (SQLi)：全專案使用 mysql2 的預編譯語法（Prepared Statements），確保資料與 SQL 指令完全分離，徹底杜絕惡意指令拼接。
 * XSS 跨站腳本防禦：
   * 前端：強制使用 .textContent 渲染，中和 HTML 標籤。
   * 後端：整合 CSP (Content Security Policy)，禁止執行未經授權的內嵌腳本。
 * 隱私保護：所有敏感配置（資料庫密碼、密鑰）均存於 .env，避免敏感資訊洩漏於原始碼中。
3. 持續整合與部署 (CI/CD & DevOps)
 * Dockerfile 快速部署：提供標準化的容器設定檔，確保開發與生產環境高度一致。
 * GitHub Actions (SAST)：配置 CodeQL 靜態原始碼分析，實現自動化代碼安全審查，及早偵測安全漏洞。
🛠️ 技術棧 (Tech Stack)
| 類別 | 技術 | 說明 |
|---|---|---|
| 環境容器化 | Docker / Compose | 實現環境隔離與快速擴展 |
| 後端框架 | Node.js / Express | 高性能非阻塞 I/O 架構 |
| 資料庫 | MySQL 8.0 | 具備 ACID 特性的關聯式資料庫 |
| 安全套件 | Helmet / Bcrypt | 工業級安全防護與回應頭管理 |
🚀 快速啟動 (Deployment)
使用 Docker 一鍵部署
 * 複製本專案：
   git clone https://github.com/your-username/your-repo.git
cd your-repo

 * 設定環境變數：
   將 .env.example 重新命名為 .env 並填入資料。
 * 啟動服務：
   docker-compose up -d

 * 存取系統：
   * 前端首頁：http://localhost:3000
   * 後端 API 狀態：http://localhost:3000/api/status
🧪 安全性測試示範 (Demo Cases)
| 測試項目 | 測試內容 | 預期行為 (安全結果) |
|---|---|---|
| XSS 注入測試 | 輸入 <script>alert(1)</script> | 頁面應正確顯示字串且不彈出視窗。 |
| 暴力破解測試 | 1 分鐘內嘗試註冊超過 5 次 | 系統應回傳 429 錯誤並暫時封鎖 IP。 |
| SQLi 測試 | 在欄位輸入 ' OR '1'='1 | 系統應提示格式錯誤，而非繞過驗證。 |
| 密碼安全測試 | 查看資料庫 users 表 | 密碼欄位必須為 60 字元之雜湊字串。 |

