import { NextFunction, Request, Response } from "express";

import userModel from "../models/userModel";
import { decodeToken } from "./../utils/tokenHelper";

const Authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { "olx-token": token } = req.headers;

  if (!token) {
    return res.status(401).json({ error: "you must logged in" });
  }

  try {
    const decoded = decodeToken(token as string) as { id: string };

    if (!decoded)
      return res.status(400).json({ err: "Invalid Authentication." });

    const user = await userModel.findOne({ _id: decoded.id });
    if (!user) return res.status(400).json({ err: "Invalid Authentication." });
    req.user = { id: user._id };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "you must logged in" });
  }
};

export default Authenticated;
