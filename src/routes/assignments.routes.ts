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
  "/:subjectId",
  authenticateJWT,
  asyncHandler(async (req, res) => {
    if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

    const assignment = await prisma.assignment.findMany({
      where: {
        id: +req.params.subjectId,
      },
    })

    res.status(200).json({
      data: {
        subject: assignment
      },
      error: null
    })

  })
);


router.post("/:subjectId", authenticateJWT, asyncHandler(async (req, res) => {
  if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

  const {name, description, type, value, points, date, done} = req.body

  const newAssignment = await prisma.assignment.create({
    data: {
      name, 
      description,
      type,
      value, 
      points,
      date,
      done,
      subjectId: +req.params.subjectId 
    }

  })

  res.status(201).json({
    data: {
      subject: newAssignment 
    },
    error: null
  })
}))

router.put("/:assignmentId", authenticateJWT, asyncHandler(async (req, res) => {
  if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

  const {name, description, type, value, points, date, done} = req.body

  const newAssignment = await prisma.assignment.update({
    where: {
      id: +req.params.assignmentId,
    },

    data: {
      name, 
      description,
      type,
      value, 
      points,
      date,
      done,
    }
  })

  res.status(201).json({
    data: {
      assignment: newAssignment
    },
    error: null
  })

}))

router.delete("/:assignmentId", authenticateJWT, asyncHandler(async (req, res) => {
  if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");


  const assignment = await prisma.assignment.delete({
    where: {
      id: +req.params.assignmentId,
    }
  })

  res.status(204).end()

}))

export default router;