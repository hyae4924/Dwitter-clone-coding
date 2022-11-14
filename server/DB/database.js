import config from "../config.js";
import { Sequelize } from "sequelize";
const { database, user, password, host } = config.db;

export const sq = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: false,
});
