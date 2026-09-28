const express = require("express");
const { load, save } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// Public: customers submit their order from checkout.
router.post("/", (req, res) => {
  const db = load();
  const { customer, items, total } = req.body || {};

  if (!customer?.fullName || !customer?.phone || !items?.length) {
    return res.status(400).json({ error: "اطلاعات سفارش ناقص است." });
  }

  const order = {
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    customer,
    items,
    total,
    status: "در انتظار تماس",
  };

  db.orders.unshift(order);
  save(db);
  res.status(201).json(order);
});

router.get("/", requireAuth, (req, res) => {
  const db = load();
  res.json(db.orders);
});

router.patch("/:id/status", requireAuth, (req, res) => {
  const db = load();
  const idx = db.orders.findIndex((o) => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "سفارش پیدا نشد." });

  db.orders[idx].status = req.body?.status || db.orders[idx].status;
  save(db);
  res.json(db.orders[idx]);
});

module.exports = router;
