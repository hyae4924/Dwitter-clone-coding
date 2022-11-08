import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import * as userRepository from "../data/user.js";

const jwtKey = process.env.JWT_KEY;

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json({ message: "Authorization error" });
  }

  const token = authHeader.split(" ")[1];

  await jwt.verify(token, jwtKey, async (err, encoded) => {
    // 시그니쳐가 변경 즉 데이터가 변경된경우
    if (err) {
      return res.status(401).json({ message: "Authorization error" });
    }
    // jwt가맞지만 인코드후 해당 데이터가 우리쪽에있는가?
    const user = await userRepository.findByusername(encoded.username);
    if (!user) {
      return res.status(401).json({ message: "Authorization error" });
    }
    req.token = token;
    req.username = user.username;
  });
  next();
};
