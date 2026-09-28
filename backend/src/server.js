require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const articlesRoutes = require("./routes/articles");
const booksRoutes = require("./routes/books");
const ordersRoutes = require("./routes/orders");
const settingsRoutes = require("./routes/settings");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use((req, res) => res.status(404).json({ error: "مسیر یافت نشد." }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "خطای داخلی سرور." });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend در حال اجرا روی http://localhost:${PORT}`);
});
