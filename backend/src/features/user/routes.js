import { Router } from "express";
import { userController } from "./controller.js";

export const userRouter = Router();

userRouter.post("/signup", (req, res, next) =>
  userController.signup(req, res, next)
);
userRouter.post("/signin", (req, res, next) =>
  userController.signin(req, res, next)
);
userRouter.get("/:id", (req, res, next) =>
  userController.getUser(req, res, next)
);
