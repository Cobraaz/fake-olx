import { Schema, model, Document, Types } from "mongoose";
import { IUserDocument } from "./userModel";

export interface IAdvertisementDocument extends Document {
  user: IUserDocument["_id"];
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

export enum CATEGORY {
  CAR = "car",
  MOTORCYCLE = "motorcycle",
  HOUSEANDAPARTMENT = "house&apartment",
  SCOOTER = "scooter",
}

const advertisementSchema = new Schema<IAdvertisementDocument>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/cobraaz/image/upload/v1595762337/gez4i626tlesoe3plwn7.jpg",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      default: CATEGORY.CAR,
      enum: CATEGORY,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IAdvertisementDocument>(
  "Advertisement",
  advertisementSchema
);
