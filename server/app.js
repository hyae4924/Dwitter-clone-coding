import express from "express";
import cors from "cors";
import moran from "morgan";
import tweetsRouter from "./router/tweets.js";

const app = express();

app.use(express.json()); // REST API의 body를 조회가능하게해줌 (내부미들웨어)
app.use(cors()); //Simple Usage (Enable All CORS Requests)
app.use(moran("combined")); // show log
app.use("/tweets", tweetsRouter);
app.listen(8080);
