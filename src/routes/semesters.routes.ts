import { Router } from "express";
import { prisma } from "../db";
import bcrypt from "bcrypt";
import { registerSchema } from "../types/Register";
import parseBody from "../utils/parseBody";
import { ErrorCode, HTTPError } from "../utils/HTTPError";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const router = Router();


router.post("/login", asyncHandler(async (req, res) => {

  

  // res.status(201).json({
  //   data: {
  //     user: userData,
  //   },
  //   error: null,
  // });

}))

export default router;