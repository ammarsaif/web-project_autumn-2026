import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role_id !== 1) {
    return res.status(403).json({
      error: "Access denied. Admin only.",
    });
  }

  next();
};

export { authenticateToken, requireAdmin };
