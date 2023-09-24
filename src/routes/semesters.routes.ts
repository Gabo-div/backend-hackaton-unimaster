import { Router } from "express";
import { prisma } from "../db";
import { ErrorCode, HTTPError } from "../utils/HTTPError";
import asyncHandler from "express-async-handler";
import { authenticateJWT } from "../middlewares/jwtHandler";

const router = Router();

router.get(
  "/",
  authenticateJWT,
  asyncHandler(async (req, res) => {
    if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");
    const semesters = await prisma.semester.findMany({
      where: {
        userId: req.user.id
      },
    });

    res.status(200).json({
      data: {
        semesters: semesters
      },
      error: null
    })

  })
);

router.post("/", authenticateJWT, asyncHandler(async (req, res) => {
    if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

    const newSemester = await prisma.semester.create({
      data: {
        name: req.body.name,
        userId: req.user.id, 
      }
    })

    res.status(201).json({
      data: {
        semester: newSemester
      },
      error: null
    })

}))

router.put("/:semesterId", authenticateJWT, asyncHandler(async (req, res) => {
    if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

    const newSemester = await prisma.semester.update({

      where: {
        id: +req.params.semesterId
      }, 

      data: req.body.name
    })

    res.status(201).json({
      data: {
        semester: newSemester
      },
      error: null
    })

}))

  router.delete("/:semesterId", authenticateJWT, asyncHandler(async (req, res) => {
    if (!req.user) throw new HTTPError(401, ErrorCode.UNAUTHORIZED, "User not authorized");

    const semester = await prisma.semester.delete({
      where: {
        id: +req.params.semesterId
      }  
    })

    res.status(204).end()

  }))

export default router;
