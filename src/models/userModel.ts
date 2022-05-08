import { Schema, model, Document } from "mongoose";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  phone_no: string;
  password: string;
  avatar: string;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_no: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/cobraaz/image/upload/v1595762337/gez4i626tlesoe3plwn7.jpg",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUserDocument>("User", userSchema);
