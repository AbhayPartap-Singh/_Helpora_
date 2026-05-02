import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import Tenant from "../models/tenant.model.js";
import OTP from "../models/otp.model.js";

import { generateOTP } from "../utils/generateOTP.js";
import { sendOTPEmail } from "../services/email.service.js";

/* ---------------- REGISTER ---------------- */
export const register = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const tenant = await Tenant.create({
      name: companyName,
      email,
    });

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      tenantId: tenant._id,
      role: "owner",
      isVerified: false,
      authProvider: "local", // ✅ FIX
    });

    tenant.ownerId = user._id;
    await tenant.save();

    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp: hashedOTP,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendOTPEmail(email, otp);

    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(201).json({
      msg: "Registered. Verify email.",
      user: safeUser,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ---------------- VERIFY OTP ---------------- */
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await OTP.findOne({ email });
    if (!record) return res.status(400).json({ msg: "No OTP found" });

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    const valid = await bcrypt.compare(otp, record.otp);
    if (!valid) return res.status(400).json({ msg: "Invalid OTP" });

    const user = await User.findOne({ email });

    user.isVerified = true;
    user.verifiedAt = new Date();
    await user.save();

    await OTP.deleteMany({ email });

    res.json({ msg: "Email verified" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ---------------- LOGIN ---------------- */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (!user.password) {
      return res.status(400).json({ msg: "Use Google login" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(401).json({ msg: "Verify email first" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        tenantId: user.tenantId,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({ token, user: safeUser });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ---------------- GOOGLE CALLBACK ---------------- */
export const googleCallback = async (req, res) => {
  try {
    const profile = req.user;

    const email = profile.emails?.[0]?.value;
    const name = profile.displayName;
    const picture = profile.photos?.[0]?.value;

    if (!email) {
      return res.status(400).json({ msg: "No email from Google" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      const tenant = await Tenant.create({
        name: `${name}'s Workspace`,
        email,
      });

      user = await User.create({
        name,
        email,
        password: undefined, // ✅ FIX
        tenantId: tenant._id,
        role: "owner",
        isVerified: true,
        authProvider: "google",
      });

      tenant.ownerId = user._id;
      await tenant.save();
    }

    const token = jwt.sign(
      {
        id: user._id,
        tenantId: user.tenantId,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({
      token,
      user: safeUser,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};