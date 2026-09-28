const express = require("express");
const { load, save } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  const db = load();
  res.json(db.settings);
});

router.put("/", requireAuth, (req, res) => {
  const db = load();
  db.settings = { ...db.settings, ...req.body };
  save(db);
  res.json(db.settings);
});

module.exports = router;
