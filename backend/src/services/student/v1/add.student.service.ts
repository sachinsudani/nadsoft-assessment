import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { HttpStatus } from "../../../enums";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { addStudentValidator } from "./validators/add.student.validator";

const addStudent: RequestHandler = asyncHandler(async (req, res) => {
    const payload = addStudentValidator.parse(req.body);

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