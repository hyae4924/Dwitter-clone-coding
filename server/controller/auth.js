import * as userRepository from "../data/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";

const createToken = async username => {
  const token = await jwt.sign(
    {
      username,
    },
    config.jwt.secretKey,
    {
      expiresIn: config.jwt.expires,
    }
  );
  return token;
};

export const signup = async (req, res) => {
  const { username, password, name, email, url } = req.body;
  const user = await userRepository.findByusername(username);
  if (user) return res.status(409).json({ message: "already exists" });
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRound);
  const newUser = await userRepository.createUser(
    username,
    hashed,
    name,
    email,
    url
  );
  const token = await createToken(username);
  res.json({ token, name: newUser.name });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userRepository.findByusername(username);
  if (!user)
    return res.status(401).json({ message: "invalid user or password" });
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(401).json({ message: "invalid user or password" });

  const token = await createToken(username);
  res.json({ token, name: user.name });
};

export const me = (req, res) => {
  res.json({ token: req.token, username: req.username });
};
