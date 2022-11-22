import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == undefined) throw new Error(`config ${key} is  undefined`);
  return value;
}
const config = {
  jwt: {
    secretKey: required("JWT_KEY", "dasfasf"),
    expires: parseInt(required("JWT_EXPIRES", 86400)),
  },
  bcrypt: {
    saltRound: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
  db: {
    host: required("DB_HOST", "localhost"),
    user: required("DB_USER", "root"),
    database: required("DB_DATABASE", "dwitter"),
    password: required("DB_PASSWORD", ""),
  },
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
  csrf: {
    key: required("CSRF_SECRET_KEY"),
  },

  rateLimit: {
    windowMs: required("RATE_LIMIT_WINDOWMS", 60000),
    max: required("RATE_LIMIT_MAX", 100),
  },
};

export default config;
