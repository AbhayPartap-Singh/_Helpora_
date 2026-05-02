export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          msg: "Unauthorized (no user)"
        });
      }

      const { role } = req.user;

      if (!role) {
        return res.status(400).json({
          msg: "User role missing"
        });
      }

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({
          msg: `Access denied for role: ${role}`
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        msg: "Role middleware error"
      });
    }
  };
};