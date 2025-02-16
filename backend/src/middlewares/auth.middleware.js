import JWT from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, error: "Access Denied. No Token Provided." });
    }

    const token = req.headers["authorization"].split(" ")[1];
    const isValid = JWT.verify(token, process.env.SECRET_KEY);
    req.userId = isValid.id;
    next();
  } catch (error) {
    next(error);
  }
};
