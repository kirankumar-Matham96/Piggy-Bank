import { userModel } from "./model.js";

class UserRepository {
  signup = async (userData) => {
    console.log("🚀 ~ UserRepository ~ signup");
    try {
      const user = await userModel(userData);
      const savedUser = await user.save();
      console.log("🚀 ~ UserRepository ~ signup= ~ savedUser:", savedUser);

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
}

export default new UserRepository();
