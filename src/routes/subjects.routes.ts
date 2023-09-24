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
  "/:semesterId",
  authenticateJWT,
  asyncHandler(async (req, res) => {
    if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

    const subject = await prisma.subject.findMany({
      where: {
        semesterId: +req.params.semesterId,
      },
    })

    res.status(200).json({
      data: {
        subject: subject
      },
      error: null
    })

  })
);


router.post("/:semesterId", authenticateJWT, asyncHandler(async (req, res) => {
  if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

  const {name, teacher, uc} = req.body
  
  const newSubject = await prisma.subject.create({
    data: {
      name,
      teacher,
      uc,
      semesterId: +req.params.semesterId
    }
})

  res.status(201).json({
    data: {
      subject: newSubject
    },
    error: null
  })
}))

router.put("/:subjectId", authenticateJWT, asyncHandler(async (req, res) => {
  if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

  const { name, teacher, uc } = req.body

  const newSubject = await prisma.subject.update({
    where: {
      id: +req.params.subjectId,
    },

    data: {
      name,
      teacher,
      uc,
    }
  })

  res.status(201).json({
    data: {
      subject: newSubject
    },
    error: null
  })

}))

router.delete("/:subjectId", authenticateJWT, asyncHandler(async (req, res) => {
  if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

  const subject = await prisma.subject.delete({
    where: {
      id: +req.params.subjectId,
    }
  })

  res.status(204).end()

}))

export default router;