import { userModel } from "./model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

class UserRepository {
  signup = async (userData) => {
    try {
      const user = await userModel(userData);
      const savedUser = await user.save();
      const newUser = {
        id: savedUser._id,
        userName: savedUser.userName,
        email: savedUser.email,
      };

      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  };

  signin = async (userData) => {
    try {
      const user = await userModel
        .findOne({ email: userData.email })
        .select("+password");
      const isUserValid = await bcrypt.compare(
        userData.password,
        user.password
      );

      if (!isUserValid) throw new Error("Invalid Credentials");

      // create JWT here
      const token = JWT.sign(
        {
          id: user._id,
          username: user.userName,
          email: user.email,
          tokenCreatedAt: `${Date.now()}-${user._id}`,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return token;
    } catch (error) {
      throw error;
    }
  };

  getUserData = async (id) => {
    try {
      const user = await userModel.findById(id);
      if (!user) throw new Error(`User with id: ${id} not found`);
      // check if the requested user id and the fetched user id are same. (To prevent users from fetching other users data)
      return user;
    } catch (error) {
      throw error;
    }
  };
}

export default new UserRepository();
