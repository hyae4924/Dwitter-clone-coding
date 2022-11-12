// user schema
// {
//   id: string // 사용자의 고유한 아이디
//   username: string,  // 사용자 닉네임 (아이디)
//   password: string,  // 사용자 비밀번호
//   name: string,  // 사용자 이름
//   email: string,  // 사용자 이메일
//   url: string (optional) // 사용자 프로파일 사진 URL
// }

import { db } from "../DB/database.js";

// const users = [
//   {
//     id: "1",
//     username: "hyae4924",
//     password: "$2b$10$16ESMKrLOnBwGSPYeOUSgue3DD8zfrLI4hkeiVy5Jn5MGM96J6oAG",
//     name: "jiwoong",
//     email: "hyae4924@naver.com",
//     url: "",
//   },
// ];

export const createUser = async (username, password, name, email, url) => {
  // const newUser = {
  //   id: new Date().toString(),
  //   username,
  //   password,
  //   name,
  //   email,
  //   url,
  // };
  // users.push(newUser);
  // return newUser;
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
