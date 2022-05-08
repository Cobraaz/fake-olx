import "dotenv-safe/config";
import express from "express";
import { connectDB } from "./utils/connectDB";

import authRoutes from "./routes/authRoutes";
import advertisementRoutes from "./routes/advertisementRoutes";

const app = express();

// TODO: Connect Database
connectDB();

// TODO: Init Middleware
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// TODO Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/advertisement", advertisementRoutes);

// TODO Client build Folder
app.use(express.static(process.cwd() + "/client/build"));
app.get("*", (_, res) => {
  res.sendFile(process.cwd() + "/client/build/index.html");
});

const PORT = parseInt(process.env.PORT, 10);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
