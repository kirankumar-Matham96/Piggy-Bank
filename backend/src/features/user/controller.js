import userRepository from "./repository.js";

class UserController {
  constructor() {
    this.repository = userRepository;
  }

  signup = async (req, res, next) => {
    try {
      const { userName, email, password } = req.body;

      const newUser = {
        userName,
        email,
        password,
      };

      const userCreated = await this.repository.signup(newUser);
      res.status(201).json({
        success: true,
        message: "User Signed Up Successfully",
        userCreated,
      });
    } catch (error) {
      console.error(`Failed to signup: ${error}`);
      next(error);
    }
  };
}

export const userController = new UserController();
