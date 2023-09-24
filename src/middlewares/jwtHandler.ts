import jwt from "jsonwebtoken";
import { ErrorCode, HTTPError } from "../utils/HTTPError";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/User";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      throw new HTTPError(403, ErrorCode.FORBIDDEN, "Invalid Token");
    }

    const { iat, ...userData } = user as User & {
      iat: number;
    };

    req.user = userData;
    next();
  });
};
