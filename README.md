# 安全會員管理系統 (Secure Member Management System)

本專案是一個具備多重安全性防護的會員註冊系統，採用 **Node.js (Express)** 作為後端，並結合 **Docker** 容器化技術實現快速部屬。

## 📖 專案概述
- **功能**：提供使用者安全註冊介面，具備前端輸入驗證、後端密碼雜湊儲存、以及全方位的 Web 安全防禦。
- **運行流程**：前端 (HTML/JS) -> API 請求 (RESTful) -> 後端安全過濾 (Middleware) -> 資料庫參數化儲存 (MySQL)。

## 🛠 系統架構與環境
- **前端 (Frontend)**: 原生 HTML5 / JavaScript (實作 XSS 防禦)。
- **後端 (Backend)**: Node.js 20+ / Express 框架。
- **資料庫 (Database)**: MySQL 8.0。
- **部署方式**: Docker / Docker-compose。
- **運行環境**: Windows 10/11 (WSL2), Docker Desktop。

---

## 🛡 安全設計說明 (評分核心)

### 1. 後端安全設計 (5 個實作)
* **Helmet.js 防護**：自動設置多種安全 HTTP Header（如 X-Frame-Options），防禦點擊劫持與基礎 XSS。
* **速率限制 (Rate Limiting)**：限制單一 IP 在 15 分鐘內僅能發送 100 次請求，有效防止密碼暴力破解攻擊。
* **Bcrypt 密碼雜湊**：使用 `bcrypt` 進行 Salted Hashing。即使資料庫外洩，駭客也無法取得會員明碼。
* **防止 SQL 注入 (SQLi)**：全專案使用 `mysql2` 的 **參數化查詢 (Prepared Statements)**，確保資料與 SQL 指令完全分離。
* **環境變數管理**：透過 `.env` 檔案管理資料庫密碼與 API 密鑰，並使用 `.gitignore` 排除，避免敏感資訊硬編碼在原始碼中。

### 2. 前端安全設計 (3 個實作)
* **輸入轉義 (XSS Prevention)**：頁面顯示使用者資訊時，嚴禁使用 `.innerHTML`，一律採用 `.textContent` 以防止惡意腳本執行。
* **客戶端密碼強度校驗**：在資料傳輸前，先於前端檢查密碼長度與格式，減少後端無效連線並增加安全性。
* **內容安全政策 (CSP)**：透過 Meta Tag 實施 CSP，限制腳本僅能從受信任來源執行。

### 3. 其他優化設計或規劃 (2 個建議)
* **MFA 多因素認證**：未來規劃導入 Google Authenticator 或 OTP 簡訊驗證，即使密碼遭竊也能保護帳戶。
* **HTTPS/TLS 加密傳輸**：計畫佈署 SSL 憑證，將傳輸協議升級為 HTTPS，防止中間人攻擊 (MITM) 竊聽封包。

---

## 💾 資料庫建置與設計
請使用以下 SQL 指令於 MySQL 中建置環境：

```sql
CREATE DATABASE IF NOT EXISTS secure_member_db;
USE secure_member_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- 儲存 Bcrypt 雜湊後的長字串
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
