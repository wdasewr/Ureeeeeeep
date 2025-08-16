// 简约而高品质的 Node/Express 后端 API
// 运行: node server.js
import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import { randomUUID } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
// 静态文件放在 public/
app.use(express.static(path.join(__dirname, "public"), { index: false }));

// 返回动态问候
app.get("/api/greet", (req, res) => {
  const greetings = [
    "Hello, world!",
    "你好，世界！",
    "Hola, mundo!",
    "Привет, мир!",
    "こんにちは世界！",
    "Bonjour le monde!",
    "Hallo, Welt!",
    "안녕하세요, 세계!"
  ];
  const message = greetings[Math.floor(Math.random() * greetings.length)];
  res.json({
    id: randomUUID(),
    message,
    ts: new Date().toISOString(),
    server: "high-end-hello/1.0"
  });
});

// 健康检查
app.get("/healthz", (_, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// 生产监听
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`High-end Hello listening on http://localhost:${PORT}`);
});
