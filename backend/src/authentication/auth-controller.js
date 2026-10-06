import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUserByEmail } from "./auth-model.js";

const loginUser = async (req, res) => {
  try {
    const user = await getUserByEmail(req.body.email);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      user.password_hash,
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        role_id: user.role_id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res.status(200).json({
      message: "Login Successful ",
      token: token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get user",
    });
  }
};

export { loginUser };
