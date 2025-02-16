import userRepository from "./repository.js";

class UserController {
  constructor() {
    this.repository = userRepository;
  }

  signup = async (req, res, next) => {
    console.log("🚀 ~ UserController ~ signup");

    try {
      const { userName, email, password } = req.body;

      const newUser = {
        userName,
        email,
        password,
      };

      const userCreated = await this.repository.signup(newUser);
      console.log("🚀 ~ UserController ~ signup= ~ userCreated:", userCreated);
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
}

export const userController = new UserController();
