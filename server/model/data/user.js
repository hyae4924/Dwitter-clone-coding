import { db } from "../../DB/database.js";

export const createUser = async (username, password, name, email, url) => {
  const userId = await db
    .query(
      `INSERT INTO users (username,password,name,email,url) VALUES(?,?,?,?,?)`,
      [username, password, name, email, url]
    )
    .then(result => {
      return result[0].insertId;
    });
  return findbyId(userId);
};

export const findbyId = async userId => {
  // return users.find(user => user.id === userId);
  return db
    .execute(`select * from users where id =?`, [userId])
    .then(result => {
      return result[0][0];
    });
};
export const findByusername = async username => {
  // return users.find(user => user.username === username);
  return db
    .execute(`select * from users where username=?`, [username])
    .then(result => {
      return result[0][0];
    });
};
