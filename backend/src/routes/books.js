const express = require("express");
const { load, save } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// Public: returns { [bookId]: { price?, stock? } } — merged client-side
// with the static book catalog (title/description/specs stay in the frontend).
router.get("/", (req, res) => {
  const db = load();
  res.json(db.bookOverrides);
});

router.put("/:id", requireAuth, (req, res) => {
  const db = load();
  const { price, stock } = req.body || {};

  db.bookOverrides[req.params.id] = {
    ...db.bookOverrides[req.params.id],
    ...(price !== undefined ? { price } : {}),
    ...(stock !== undefined ? { stock } : {}),
  };

  save(db);
  res.json(db.bookOverrides[req.params.id]);
});

module.exports = router;
