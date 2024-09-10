const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const JWT_SECRET =
    "8adb2800f5919d341a7cd25702cc02745e7759390b2c3332bcaf1e0c6cd268b7";
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
