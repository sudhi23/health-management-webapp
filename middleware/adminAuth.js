const config = require("config");
const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("adminSecret"));

    // Add member from payload
    req.admin = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = adminAuth;
