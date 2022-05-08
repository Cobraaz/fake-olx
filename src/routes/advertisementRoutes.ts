import express from "express";
const router = express.Router();

import { check } from "express-validator";
import {
  createAdvertisement,
  getAdvertisementById,
  getAdvertisements,
  getAdvertisementsById,
} from "../controllers/advertisementController";
import Authenticated from "../middleware/Authenticated";

router.post(
  "/create-ad",
  [
    check("title", "Please include a Title").not().isEmpty().isString(),
    check("description", "Please include a Title").not().isEmpty().isString(),
    check("price", "Please include a Title").not().isEmpty().isNumeric(),
    check("category", "Please include a Category").not().isEmpty().isString(),
    Authenticated,
  ],
  createAdvertisement
);
router.get("/get-advertisements", getAdvertisements);
router.get("/get-advertisements/user", Authenticated, getAdvertisementsById);
router.get("/get-advertisement/:id", getAdvertisementById);

export default router;
