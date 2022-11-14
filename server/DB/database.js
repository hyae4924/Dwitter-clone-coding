// import mysql from "mysql2";
import config from "../config.js";
import { Sequelize, Model, DataTypes } from "sequelize";
const { database, user, password, host } = config.db;

export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: false,
});

// ------------------------------------------------------------------------------
export class Users extends Model {}
Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    url: DataTypes.TEXT,
  },
  { sequelize, modelName: "users", timestamps: false }
);

// ------------------------------------------------------------------------------
export class Tweets extends Model {}
Tweets.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    text: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, modelName: "tweets", timestamps: false }
);
Tweets.belongsTo(Users);
// ------------------------------------------------------------------------------
const user1 = {
  username: "hyae4924",
  password: "$2b$10$16ESMKrLOnBwGSPYeOUSgue3DD8zfrLI4hkeiVy5Jn5MGM96J6oAG",
  name: "jiwoong",
  email: "hyae4924@gmail.com",
};
const user2 = {
  username: "hyae1004",
  password: "$2b$10$16ESMKrLOnBwGSPYeOUSgue3DD8zfrLI4hkeiVy5Jn5MGM96J6oAG",
  name: "jihaye",
  email: "hyae4924@naver.com",
};
const tweet1 = {
  text: "쉽지않아 하나도",
  createdAt: new Date(),
  userId: 1,
};
const tweet2 = {
  text: "인즈엉",
  createdAt: new Date(),
  userId: 2,
};

// ------------------------------------------------------------------------------
setTimeout(async () => {
  const test = await Users.findOne();
  if (!test) {
    Users.bulkCreate([user1, user2]);
    Tweets.bulkCreate([tweet1, tweet2]);
  }
}, 500);
