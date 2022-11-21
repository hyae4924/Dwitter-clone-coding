import * as userRepository from "../model/data/user.js";
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

const setToken = async (res, token) => {
  const option = {
    maxAge: config.jwt.expires * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, option);
};

const createCsrfToken = async () => {
  return bcrypt.hash(config.csrf.key, 2);
};

//-------------------------------------------------
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
  await setToken(res, token);
  res.json({ name: newUser.username });
};
//-------------------------------------------------
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userRepository.findByusername(username);
  if (!user)
    return res.status(401).json({ message: "invalid user or password" });
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(401).json({ message: "invalid user or password" });

  const token = await createToken(username);
  await setToken(res, token);
  res.json({ username: user.username });
};
//-------------------------------------------------
export const me = (req, res) => {
  res.json({ username: req.username });
};
//-------------------------------------------------
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "You are logged out" });
};
//-------------------------------------------------
export const csrf = async (req, res) => {
  const csrfToken = await createCsrfToken();
  return res.status(200).json({ csrfToken });
};
