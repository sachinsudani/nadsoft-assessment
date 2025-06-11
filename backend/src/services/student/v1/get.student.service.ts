import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { HttpStatus } from "../../../enums";
import { ApiError } from "../../../utils/ApiError";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { getStudentValidator } from "./validators/get.student.validator";

const getStudentById: RequestHandler = asyncHandler(async (req, res) => {
    const { id: studentId } = getStudentValidator.parse(req.params);

    const student = await prisma.student.findUnique({ where: { id: studentId }, include: { marks: { include: { subject: true } } } });

    if (!student) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Student not found");
    }

    res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, student, "Student retrieved successfully"));

});

export { getStudentById };

