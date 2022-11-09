import dotenv from "dotenv";
dotenv.config();
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == undefined) throw new Error(`config ${key} is  undefined`);
  return value;
}
const config = {
  jwt: {
    secretKey: required("JWT_KEY"),
    expires: parseInt(required("JWT_EXPIRES", 86400)),
  },
  bcrypt: {
    saltRound: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
};
console.log("___follow is config set___");
console.dir(config, { depth: 2, showHidden: true });
export default config;
