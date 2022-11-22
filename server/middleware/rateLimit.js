import rateLimit from "express-rate-limit";
import config from "../config.js";

export default rateLimit({
  windowMs: config.rateLimit.windowMs, // 측정시간
  max: config.rateLimit.max, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers(시간당 호출할 수 있는 횟수정보)
});
