import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { HttpStatus } from "../../../enums";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { getStudentValidator } from "./validators/get.student.validator";

const deleteStudent: RequestHandler = asyncHandler(async (req, res) => {
    const { id: studentId } = getStudentValidator.parse(req.params);
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
