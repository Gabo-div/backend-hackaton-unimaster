import { Router } from "express";
import { prisma } from "../db";
import bcrypt from "bcrypt";
import { registerSchema } from "../types/Register";
import parseBody from "../utils/parseBody";
import { ErrorCode, HTTPError } from "../utils/HTTPError";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const router = Router();




// router.get("/all", asyncHandler(async (req, res) => {

//     const semesters = await prisma.semester.findMany()
//     res.json(semesters)
//     // res.status(201).json({
//     //   data: {
//     //     semesters: semesters
//     //   },
//     //   error: null
//     // })

// }))

router.get("/all", asyncHandler(async(req, res) => {
    const semesters = await prisma.user.findMany()
    res.json(semesters)

}))

//   // res.status(201).json({
//   //   data: {
//   //     user: userData,
//   //   },
//   //   error: null,
//   // });

export default router;