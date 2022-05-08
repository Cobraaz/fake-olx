import jwt from "jsonwebtoken";

export const createToken = (payload: any) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET);
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
};
