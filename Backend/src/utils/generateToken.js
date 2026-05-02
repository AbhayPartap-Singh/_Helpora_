import jwt from "jsonwebtoken";

/**
 * 🔐 Generate Access Token
 * Used after login / auth
 */
export const generateToken = (user) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign(
      {
        id: user._id,
        tenantId: user.tenantId,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
      }
    );

  } catch (error) {
    console.error("Token generation error:", error.message);
    throw new Error("Failed to generate token");
  }
};


/**
 * 🔁 OPTIONAL: Generate Refresh Token (for future scaling)
 */
export const generateRefreshToken = (user) => {
  try {
    if (!process.env.JWT_REFRESH_SECRET) {
      throw new Error("JWT_REFRESH_SECRET is not defined");
    }

    return jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d"
      }
    );

  } catch (error) {
    console.error("Refresh token error:", error.message);
    throw new Error("Failed to generate refresh token");
  }
};