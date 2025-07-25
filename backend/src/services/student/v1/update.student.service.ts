import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { HttpStatus } from "../../../enums";
import { ApiError } from "../../../utils/ApiError";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { getStudentValidator } from "./validators/get.student.validator";
import { updateStudentValidator } from "./validators/update.student.validator";

const updateStudent: RequestHandler = asyncHandler(async (req, res) => {
    const { id: studentId } = getStudentValidator.parse(req.params);
    const payload = updateStudentValidator.parse(req.body);

    const studentExists = await prisma.student.findUnique({ where: { id: studentId } });

    if (!studentExists) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Student not found");
    }

    const student = await prisma.student.update({
        where: { id: studentId },
        data: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            class: payload.class,
            age: payload.age,
        },
    });

    res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, student, "Student updated successfully"));
});

export { updateStudent };

