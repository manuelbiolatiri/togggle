import * as jwt from "jsonwebtoken";
import config from "../config";

export const verifyAuthToken = function (token: string) {
  try {
    return jwt.verify(token, config().JWT_KEY, { ignoreExpiration: false });
  } catch (err) {
    return null;
  }
};
