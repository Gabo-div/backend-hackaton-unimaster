import { Router } from "express";
import { prisma } from "../db";
import bcrypt from "bcrypt";
import { registerSchema } from "../types/Register";
import parseBody from "../utils/parseBody";
import { ErrorCode, HTTPError } from "../utils/HTTPError";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { authenticateJWT } from "../middlewares/jwtHandler";

const router = Router();

router.get(
  "/show",
  asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  })
);

router.get(
  "/",
  authenticateJWT,
  asyncHandler(async (req, res) => {
    if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

    console.log(req.user);

    const semesters = await prisma.semester.findMany({
      where: {
        id: req.user.id,
      },
    });
  })
);

//   // res.status(201).json({
//   //   data: {
//   //     user: userData,
//   //   },
//   //   error: null,
//   // });

export default router;
