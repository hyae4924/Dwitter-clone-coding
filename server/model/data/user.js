import { Users } from "../model.js";
export const createUser = async (username, password, name, email, url) => {
  return Users.create({ username, password, name, email, url });
};

export const findbyId = async userId => {
  return Users.findOne({ where: { id: userId } });
};
export const findByusername = async username => {
  return Users.findOne({ where: { username } });
};
