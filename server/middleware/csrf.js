import bcrypt from "bcrypt";
import config from "../config.js";

export const isCsrf = async (req, res, next) => {
  if (req.method === "GET" || req.method === "OPTIONS" || req.method === "HEAD")
    return next();
  const csrfToken = req.get("Csrf-Token");
  if (!csrfToken) {
    // for log suspicious request
    console.warn("There is not csrfToken", req.headers.origin);
    return res.status(403).json({ message: "Please check csrfToken" });
  }
  bcrypt
    .compare(config.csrf.key, csrfToken) //
    .then(result => {
      if (!result) {
        console.warn("csrfToken don't match.");
        console.warn("origin:", req.headers.origin);
        console.warn("csrfToken", csrfToken);
        return res.status(403).json({ message: "Falied csrf check" });
      }
      next();
    }) //
    .catch(err => {
      console.err(err);
      return res.status(500).json({ message: "something went wrong" });
    });
};
