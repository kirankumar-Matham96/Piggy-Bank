import { Router } from "express";
import { userController } from "./controller.js";
import { auth } from "../../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.post("/signup", (req, res, next) =>
  userController.signup(req, res, next)
);

userRouter.post("/signin", (req, res, next) =>
  userController.signin(req, res, next)
);

userRouter.get("/signout", (req, res, next) =>
  userController.signout(req, res, next)
);

userRouter.get("/", auth, (req, res, next) =>
  userController.getUser(req, res, next)
);
