import mongoose from "mongoose";
import { ConnectionOptions } from "tls";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectionOptions
    );

    console.log("MongoDB Connected...");
  } catch (err: any) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};
