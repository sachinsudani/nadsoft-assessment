import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { HttpStatus } from "../../../enums";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { addStudentValidator } from "./validators/add.student.validator";
import { ApiError } from "../../../utils/ApiError";

const addStudent: RequestHandler = asyncHandler(async (req, res) => {
    const payload = addStudentValidator.parse(req.body);

    const studentExists = await prisma.student.findUnique({ where: { email: payload.email } });

    if (studentExists) {
        throw new ApiError(HttpStatus.CONFLICT, "Student with this email already exists");
    }

    const student = await prisma.student.create({
        data: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            class: payload.class,
            age: payload.age,
        },
    });

    res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse(HttpStatus.CREATED, student, "Student added successfully"));
});

export { addStudent };