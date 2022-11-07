import * as userRepository from "../data/user.js";
import * as jwtRepository from "../middleware/jwt.js";

export const signUp = async (req, res) => {
  const { userId, password, username, email, profile_picture } = req.body;
  const user = userRepository.findUser(userId);
  if (user)
    return res.status(409).json({ message: "userId is already exists" });
  const newUser = await userRepository.createUser(
    userId,
    password,
    username,
    email,
    profile_picture
  );
  const accestoken = await jwtRepository.createAccesToken(userId, username);
  res.json({ accestoken, username: newUser.username });
};

export const logIn = async (req, res) => {
  const { userId, password } = req.body;
  const user = userRepository.findUser(userId, password);
  const accestoken = await jwtRepository.createAccesToken(
    userId,
    user.username
  );
  res.json({ accestoken, username: user.username });
};
export const me = async (req, res) => {
  const { authorization } = req.headers;
  const token = await jwtRepository.checkToken(authorization.split(" ")[1]);
  if (token) return res.json({ token, username: token.username });
  else return res.status(401).json({ message: "Unauthorized" });
};
