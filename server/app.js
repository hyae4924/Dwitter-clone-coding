import express from "express";
import cors from "cors";
import moran from "morgan";
import helmet from "helmet";
import tweetsRouter from "./router/tweets.js";

const app = express();

app.use(express.json()); // REST API의 body를 조회가능하게해줌 (내부미들웨어)
app.use(cors()); //Simple Usage (Enable All CORS Requests)
app.use(helmet());
app.use(moran("tiny")); // show log

app.use("/tweets", tweetsRouter);

app.use((res, req, next) => {
  res.status(404);
});
app.use((err, res, req, next) => {
  console.error(err);
  res.status(500);
});
app.listen(8080);
