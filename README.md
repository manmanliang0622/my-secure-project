# 🛡️ 安全會員管理系統 (Secure Member Management System)

[![Security Scan: CodeQL](https://github.com/manmanliang0622/my-secure-project/actions/workflows/codeql.yml/badge.svg)](https://github.com/manmanliang0622/my-secure-project/actions)
![Docker Supported](https://img.shields.io/badge/Docker-Supported-blue?logo=docker)
![Node Version](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)

本專案是一個具備多層次防禦架構的 Web 會員系統。開發核心遵循 **OWASP Top 10** 安全規範，旨在展示如何從前端、後端到資料庫構建一個抗攻擊的現代化應用。

---

## 📖 專案亮點與流程
* **核心價值**：實現「資料隱私、流程安全、部署自動化」。
* **運行流程**：
    * **用戶端**：實施嚴格的欄位檢核與 XSS 字符轉義。
    * **網絡層**：透過 Helmet 設定安全性 HTTP 標頭，並由 Rate-limiter 過濾非法流量。
    * **業務邏輯**：使用 Bcrypt 進行高強度密碼雜湊，配合 SQL 參數化查詢。
    * **運維層**：容器化封裝 (Docker)，確保環境隔離與安全一致性。

---

## 🛡️ 安全防禦深度解析

### 1. 身份與存取控制 (Identity & Access Control)
* **Bcrypt 雜湊加密**：採用 Salted Hashing 技術。儲存格式為 `$2b$12$...`，具備極強的抗彩虹表與暴力破解能力。
* **RBAC 權限管理**：資料庫設計內建 `role` 欄位（User/Admin），實現**最小特權原則**。
* **防止暴力破解**：整合 `express-rate-limit`。若偵測到異常高頻請求，系統將自動回傳 **HTTP 429 Too Many Requests**。

### 2. 資料安全與防注入 (Data Integrity)
* **SQL 注入防禦 (SQLi)**：使用預編譯語法（Prepared Statements），確保資料與 SQL 指令完全分離，徹底杜絕指令拼接。
* **XSS 跨站腳本防禦**：
    * **前端**：強制使用 `.textContent` 渲染，中和 HTML 標籤。
    * **後端**：整合 **CSP (Content Security Policy)**，禁止執行未經授權的內嵌腳本。
* **隱私保護**：所有敏感配置（資料庫密碼、密鑰）均存於 `.env`，避免資訊洩漏。

### 3. 持續整合與部署 (CI/CD & DevOps)
* **Dockerfile 快速部署**：提供標準化容器設定檔，確保開發與生產環境高度一致。
* **GitHub Actions (SAST)**：配置 **CodeQL 靜態原始碼分析**，實現自動化代碼安全審查。

---

## 🛠️ 技術棧 (Tech Stack)

| 類別 | 技術 | 說明 |
| :--- | :--- | :--- |
| 環境容器化 | Docker / Compose | 實現環境隔離與快速擴展 |
| 後端框架 | Node.js / Express | 高性能非阻塞 I/O 架構 |
| 資料庫 | MySQL 8.0 | 具備 ACID 特性的關聯式資料庫 |
| 安全套件 | Helmet / Bcrypt | 工業級安全防護與回應頭管理 |

---

## 🚀 快速啟動 (Deployment)

### 使用 Docker 一鍵部署
1. **複製本專案**：
   ```bash
   git clone [https://github.com/manmanliang0622/my-secure-project.git](https://github.com/manmanliang0622/my-secure-project.git)
