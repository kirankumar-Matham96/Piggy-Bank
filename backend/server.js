import "dotenv/config";
import express from "express";
import CORS from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./src/config/mongodb.config.js";
import { userRouter } from "./src/features/user/routes.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  CORS({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("welcome to Piggy Bank!");
});

app.use("/api/user", userRouter);

app.listen(PORT || 3000, () => {
  connectToDB();
  console.log(`Server running at: http://localstorage:${PORT}`);
});
