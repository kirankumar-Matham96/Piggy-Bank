import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const client = await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB!");
  } catch (error) {
    console.error(`Failed to connect DB: ${error}`);
  }
};
