import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: string;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  // Check if the Authorization header is present and the token starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Get the token part

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      if (typeof decoded !== "string" && "id" in decoded) {
        if (!decoded.id) {
          throw new Error("user info is not found");
        }
      } else {
        throw new Error("Invalid token payload");
      }

      // Attach the user data (decoded token) to the request object
      req.user = decoded.id;

      next(); // Call the next middleware
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
