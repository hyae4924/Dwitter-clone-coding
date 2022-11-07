import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const users = [];

export const createUser = async (
  userId,
  password,
  username,
  email,
  profile_picture
) => {
  const newUser = {
    id: new Date(),
    userId,
    password: await bcrypt.hash(password, 10),
    username,
    email,
    profile_picture,
  };
  users.push(newUser);
  console.log("$$$$$$$$", users);
  return newUser;
};

export const findUser = (userId, password) => {
  const user = password
    ? users.find(
        user =>
          user.userId === userId && bcrypt.compareSync(password, user.password)
      )
    : users.find(user => user.userId === userId);
  return user || false;
};
