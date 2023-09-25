import { Router } from "express";
import { prisma } from "../db";
import asyncHandler from "express-async-handler";
import { authenticateJWT } from "../middlewares/jwtHandler";
import { ErrorCode, HTTPError } from "../utils/HTTPError";

const router = Router();

router.get(
  "/me",
  authenticateJWT,
  asyncHandler(async (req, res) => {
    if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

    const { password, ...userData } = req.user;

    res.status(201).json({
      data: {
        user: userData,
      },
      error: null,
    });
  })
);

export default router;
