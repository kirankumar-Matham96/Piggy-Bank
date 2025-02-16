import bcrypt from "bcrypt";

export const getHashedPassword = async (password) => {
  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    if (isNaN(saltRounds) || saltRounds <= 0) {
      throw new Error("SALT_ROUNDS must be a positive integer");
    }

    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw error;
  }
};
