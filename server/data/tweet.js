import * as userRepository from "../data/user.js";
import { db } from "../DB/database.js";

const leftJoin =
  "select t.id,t.text,t.createdAt,t.userId,u.username,u.name,u.url from tweets as t left join users as u on u.id=t.userId";
const orderBy = "order by t.createdAt desc";
export async function getAll() {
  return db.query(`${leftJoin} ${orderBy} `).then(result => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .query(`${leftJoin} where u.username=? ${orderBy}`, [username])
    .then(result => result[0]);
}

export async function getById(id) {
  return db.query(`${leftJoin} where t.id=? ${orderBy}`, [id]).then(result => {
    console.log(result[0][0]);
    return result[0][0];
  });
}

export async function create(userId, text) {
  return db
    .query(`insert into tweets (text,createdAt,userId) values(?,?,?)`, [
      text,
      new Date(),
      userId,
    ])
    .then(result => getById(result[0].insertId));
}

export async function update(id, text) {
  return db
    .query(`update tweets set text=? where id=?`, [text, id])
    .then(result => getById(id));
}

export async function remove(id) {
  db.query(`delete from tweets  where id=?`, [id]);
}
