export const attachTenant = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        msg: "Unauthorized (no user in request)"
      });
    }

    const { tenantId } = req.user;

    if (!tenantId) {
      return res.status(400).json({
        msg: "Tenant ID missing in token"
      });
    }

    req.tenantId = tenantId;

    next();
  } catch (error) {
    return res.status(500).json({
      msg: "Tenant middleware error"
    });
  }
};