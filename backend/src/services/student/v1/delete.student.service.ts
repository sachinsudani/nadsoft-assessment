import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { HttpStatus } from "../../../enums";
import { ApiError } from "../../../utils/ApiError";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { getStudentValidator } from "./validators/get.student.validator";

const deleteStudent: RequestHandler = asyncHandler(async (req, res) => {
    const { id: studentId } = getStudentValidator.parse(req.params);

    const studentExists = await prisma.student.findUnique({ where: { id: studentId } });

    if (!studentExists) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Student not found");
    }

    await prisma.mark.deleteMany({
        where: { studentId: studentId },
    });

    await prisma.student.delete({
        where: { id: studentId },
    });

    res
        .status(HttpStatus.NO_CONTENT)
        .json(new ApiResponse(HttpStatus.NO_CONTENT, null, "Student deleted"));
});

export { deleteStudent };

