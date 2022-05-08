import { Request, Response } from "express";
import { validationResult } from "express-validator";
import userModel, { IUserDocument } from "../models/userModel";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/tokenHelper";
import { Types } from "mongoose";

type LoginBody = Pick<IUserDocument, "email" | "password">;

interface ProfileBody extends Omit<IUserDocument, "email"> {
  id: Types.ObjectId;
}

export const register = async (
  req: Request<{}, {}, IUserDocument>,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(errors.array());
    return res.status(400).json({ err: errors.array() });
  }

  const { name, email, phone_no, password } = req.body;

  try {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      return res
        .status(400)
        .json({ err: [{ msg: "This email already exists." }] });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new userModel({
      name,
      email,
      phone_no,
      password: passwordHash,
    });

    const user = await newUser.save();

    const token = createToken({ id: user._id });

    return res.json({
      token,
      msg: "Register Success!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};
export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(errors.array());
    return res.status(400).json({ err: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ err: [{ msg: "This user doesn't exist." }] });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ err: [{ msg: "Incorrect password." }] });

    const token = createToken({ id: user._id });

    return res.json({
      token,
      msg: "Login Success!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user)
      return res.status(400).json({ err: [{ msg: "User does not exist." }] });

    const newToken = createToken({ id: user._id });

    return res.json({
      token: newToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};

export const profile = async (
  req: Request<{}, {}, ProfileBody>,
  res: Response
) => {
  try {
    const { name, avatar, phone_no, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await userModel.findOneAndUpdate(
      { _id: req.user.id },
      { name, avatar, phone_no, password: passwordHash }
    );

    if (!user)
      return res.status(400).json({ err: [{ msg: "Please login now!" }] });

    const newToken = createToken({ id: user._id });

    res.json({
      msg: "Update Success!",
      token: newToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        avatar: user.avatar,
      },
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
};
