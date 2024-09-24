import jwt from "jsonwebtoken";

export const signJwt = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};
