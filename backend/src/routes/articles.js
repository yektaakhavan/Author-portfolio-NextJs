const express = require("express");
const { load, save } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  const db = load();
  const list = [...db.articles].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
  res.json(list);
});

router.get("/:id", (req, res) => {
  const db = load();
  const article = db.articles.find((a) => String(a.id) === req.params.id);
  if (!article) return res.status(404).json({ error: "مقاله پیدا نشد." });
  res.json(article);
});

router.post("/", requireAuth, (req, res) => {
  const db = load();
  const { title, summary, content1, content2, image, publishedAt } = req.body || {};

  if (!title || !summary || !content1) {
    return res.status(400).json({ error: "عنوان، خلاصه و متن اصلی الزامی است." });
  }

  const article = {
    id: db.nextArticleId,
    title,
    summary,
    content1,
    content2: content2 || "",
    image: image || "/uploads/articles/focus-productivity.svg",
    publishedAt: publishedAt || new Date().toISOString(),
  };

  db.articles.push(article);
  db.nextArticleId += 1;
  save(db);
  res.status(201).json(article);
});

router.put("/:id", requireAuth, (req, res) => {
  const db = load();
  const idx = db.articles.findIndex((a) => String(a.id) === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "مقاله پیدا نشد." });

  const { title, summary, content1, content2, image, publishedAt } = req.body || {};
  db.articles[idx] = {
    ...db.articles[idx],
    ...(title !== undefined ? { title } : {}),
    ...(summary !== undefined ? { summary } : {}),
    ...(content1 !== undefined ? { content1 } : {}),
    ...(content2 !== undefined ? { content2 } : {}),
    ...(image !== undefined ? { image } : {}),
    ...(publishedAt !== undefined ? { publishedAt } : {}),
  };

  save(db);
  res.json(db.articles[idx]);
});

router.delete("/:id", requireAuth, (req, res) => {
  const db = load();
  const exists = db.articles.some((a) => String(a.id) === req.params.id);
  if (!exists) return res.status(404).json({ error: "مقاله پیدا نشد." });

  db.articles = db.articles.filter((a) => String(a.id) !== req.params.id);
  save(db);
  res.status(204).end();
});

module.exports = router;
