import userRepository from "./repository.js";

class UserController {
  signup = async (req, res, next) => {
    try {
      const { userName, email, password } = req.body;

      const newUser = {
        userName,
        email,
        password,
      };

      const userCreated = await userRepository.signup(newUser);
      res.status(201).json({
        success: true,
        message: "User Signed Up Successfully",
        userCreated,
      });
    } catch (error) {
      console.log(`Failed to signup: ${error}`);
      next(error);
    }
  };

  signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await userRepository.signin({ email, password });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      return res
        .status(200)
        .json({ success: true, message: "user signed in successfully" });
    } catch (error) {
      console.log(`Failed to signin: ${error}`);
      next(error);
    }
  };

  signout = (req, res, next) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      res
        .status(200)
        .json({ success: true, message: "User signed out successfully" });
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const id = req.userId;
      const user = await userRepository.getUserData(id);
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.log(`Failed to fetch user data: ${error}`);
      next(error);
    }
  };
}

export const userController = new UserController();
