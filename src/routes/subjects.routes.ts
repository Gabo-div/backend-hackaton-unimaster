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
  "/",
  authenticateJWT,
  asyncHandler(async (req, res) => {
    if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

    const subject = await prisma.subject.findMany({
      where: {
        id: req.user.id,
      },
    });
  })
);

router.post("/add", authenticateJWT, asyncHandler(async (req, res) => {
  if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

  const newSubject = await prisma.subject.create({
    data: {
      name: req.body.name,
      teacher: req.body.teacher,
      uc: req.body.uc,
      semesterId: req.body.semesterId // Aquí tiene que haber conexion
    }
  })

  res.status(201).json({
    data: {
      subject: newSubject
    },
    error: null
  })
}))

router.put("/:id", authenticateJWT, asyncHandler(async (req, res) => {
  if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

  const newSubject = await prisma.subject.update({
    where: {
      id: +req.params.id
    },
    data: {
      name: req.body.name,
      teacher: req.body.teacher,
      uc: req.body.uc,
      semesterId: req.body.semesterId
    }
  })

  res.status(201).json({
    data: {
      subject: newSubject
    },
    error: null
  })

}))

router.delete("/:id", authenticateJWT, asyncHandler(async (req, res) => {
  if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

  const subject = await prisma.subject.delete({
    where: {
      id: +req.params.id
    }
  })

  res.status(201).json({
    data: {
      subject: subject
    },
    error: null
  })
}))

export default router;