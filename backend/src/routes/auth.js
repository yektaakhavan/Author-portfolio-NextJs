const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD || "admin1403", 10);

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (username !== ADMIN_USERNAME || !bcrypt.compareSync(password || "", ADMIN_PASSWORD_HASH)) {
    return res.status(401).json({ error: "نام کاربری یا رمز عبور اشتباه است." });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET || "dev-secret-change-me",
    { expiresIn: "12h" }
  );

  res.json({ token });
});

module.exports = router;
