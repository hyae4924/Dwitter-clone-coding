import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const key = process.env.JWT_KEY;

export const createAccesToken = async (userId, username) => {
  const accestoken = await jwt.sign(
    {
      userId,
      username,
    },
    key,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
  return accestoken;
};

export const checkToken = async token => {
  let verifyed;
  await jwt.verify(token, key, (err, result) => {
    if (err) {
      verifyed = err;
    } else {
      verifyed = result;
    }
  });
  return verifyed;
};
