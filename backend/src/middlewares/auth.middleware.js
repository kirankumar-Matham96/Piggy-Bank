import JWT from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const isValid = JWT.verify(token, process.env.SECRET_KEY);
    req.userId = isValid.id;
    next();
  } catch (error) {
    next(error);
  }
};
