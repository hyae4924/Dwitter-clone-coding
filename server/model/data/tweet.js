import { Users, Tweets } from "../model.js";
import { Sequelize } from "sequelize";

const incloudUserOp = {
  attributes: [
    "id",
    "text",
    "createdAt",
    "userId",
    [Sequelize.col("user.name"), "name"],
    [Sequelize.col("user.username"), "username"],
    [Sequelize.col("user.url"), "url"],
  ],
  include: {
    model: Users,
    attributes: [],
  },
};
const orderOP = { order: [["createdAt", "DESC"]] };
export async function getAll() {
  return Tweets.findAll({ ...incloudUserOp, ...orderOP, raw: true });
}

export async function getAllByUsername(username) {
  return Tweets.findAll({
    ...incloudUserOp,
    ...orderOP,
    include: {
      ...incloudUserOp.include,
      where: { username },
    },
  });
}

export async function getById(id) {
  return Tweets.findOne({
    ...incloudUserOp,
    where: { id: Number(id) },
  }).then(tweet => tweet.dataValues);
}

export async function create(userId, text) {
  return Tweets.create({
    userId,
    text,
    createdAt: new Date(),
  }).then(tweet => getById(tweet.dataValues.id));
}

export async function update(id, text) {
  return Tweets.findByPk(id, incloudUserOp) //
    .then(tweet => {
      tweet.text = text;
      return tweet.save();
    });
}

export async function remove(id) {
  return Tweets.destroy({ where: { id } });
  // return Tweets.findByPk(id) //
  //   .then(tweet => tweet.destroy());
}
