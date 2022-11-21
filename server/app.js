import express from "express";
import cors from "cors";
import moran from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import config from "./config.js";
import { db } from "./DB/database.js";
const app = express();
const corsOptions = {
  origin: config.cors.allowedOrigin,
  optionSucessStatus: 200,
  credentials: true, //allow the Access-Control-Credentials
};
app.use(express.json()); // REST API의 body를 조회가능하게해줌 (내부미들웨어)
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());
app.use(moran("tiny")); // show log

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.status(404);
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
});
db.getConnection();
app.listen(config.host.port);
