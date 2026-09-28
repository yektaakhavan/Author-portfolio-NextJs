const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "توکن ارسال نشده است." });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || "dev-secret-change-me");
    next();
  } catch {
    return res.status(401).json({ error: "توکن نامعتبر یا منقضی‌شده است." });
  }
}

module.exports = { requireAuth };
