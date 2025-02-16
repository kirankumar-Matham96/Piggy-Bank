import mongoose from "mongoose";
import { getHashedPassword } from "../../util/encryptPassword.js";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      minlength: [3, "User name should have at least 3 characters"],
      require: [true, "User Name is required"],
      match: [
        /^[a-zA-Z_-\s]+$/,
        "Invalid user name. User name should not contain any integers or special characters except (_) and (-).",
      ],
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email",
      ],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%&*_\-/.]).{8,}$/,
        "password should contain min of 8 characters and at least one upper case one lower case one integer and one special character.",
      ],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
).pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashedPassword = await getHashedPassword(this.password);
  this.password = hashedPassword;
  next();
});

export const userModel = mongoose.model("users", UserSchema);
