import { userModel } from "./model.js";

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
}

export default new UserRepository();
