import jwt from "jsonwebtoken";
import { ErrorCode, HTTPError } from "../utils/HTTPError";
import { Request, Response, NextFunction } from "express";


export const authenticateJWT = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET as string, (err:any, user: any) => {


            if (err) { // Forbidden
                return res.status(403).json({
                  data:null,
                  error: err
                });

            }

            req.user = user 
            next();
        });

    } else {
        throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");
    }
};
