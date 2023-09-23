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

  const { email, password } = await parseBody(registerSchema, req.body);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new HTTPError(404, ErrorCode.NOT_FOUND, "User not found");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new HTTPError(400, ErrorCode.BAD_REQUEST, "Invalid credentials");
  }

  const token = jwt.sign(user, process.env.JWT_SECRET as string);

  res.status(200).json({
    data: {
      token,
    },
    error: null,
  });

}))

router.post("/register", asyncHandler(async (req, res) => {

  const { email, name, password } = await parseBody(registerSchema, req.body);

  const emailAlreadyExists = await prisma.user.findUnique({
    where: { email },
  });

  if (emailAlreadyExists) throw new HTTPError(400, ErrorCode.BAD_REQUEST, "El email ya existe");

  const hashedPassword = await bcrypt.hash(password, 10);

  const { password: _userPassword, ...userData } = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    data: {
      user: userData,
    },
    error: null,
  });
})
);

export default router;
