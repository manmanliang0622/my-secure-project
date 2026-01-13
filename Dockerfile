# 使用官方 Node.js 20 映像檔作為基礎
FROM node:20

# 設定容器內的運作目錄
WORKDIR /app

# 先複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝專案所需的套件
RUN npm install

# 複製其餘所有程式碼 (包含 src, models 等)
COPY . .

# 宣告容器會使用的 Port (與你的 app.js 一致)
EXPOSE 3000

# 啟動指令
CMD ["node", "src/app.js"]