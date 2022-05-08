import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IAdvertisementDocument } from "../models/advertisementModel";
import advertisementModel from "../models/advertisementModel";

export const createAdvertisement = async (
  req: Request<{}, {}, IAdvertisementDocument>,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(errors.array());
    return res.status(400).json({ err: errors.array() });
  }
  console.log(req.body);
  const { image, title, description, price, category } = req.body;

  try {
    const newAdvertisement = new advertisementModel({
      user: req.user.id,
      image,
      title,
      description,
      price,
      category,
    });

    await newAdvertisement.save();

    return res.json({
      msg: "Advertisement Created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};

export const getAdvertisements = async (_: Request, res: Response) => {
  try {
    const advertisements = await advertisementModel.find();
    return res.json({
      advertisements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};

export const getAdvertisementById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const advertisementId = req.params.id;
    const advertisement = await advertisementModel.findById(advertisementId);
    return res.json({
      advertisement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};
export const getAdvertisementsById = async (req: Request, res: Response) => {
  try {
    console.log(req.user.id);
    const advertisements = await advertisementModel.find({
      user: req.user.id,
    });
    return res.json({
      advertisements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};
