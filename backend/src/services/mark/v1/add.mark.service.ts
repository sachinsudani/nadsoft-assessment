import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { HttpStatus } from "../../../enums";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { addMarkValidator } from "./validators/add.mark.validator";

const addMark: RequestHandler = asyncHandler(async (req, res) => {
    const payload = addMarkValidator.parse(req.body);

    const mark = await prisma.mark.create({
        data: {
            score: payload.score,
            term: payload.term,
            year: payload.year,
            student: { connect: { id: payload.studentId } },
            subject: { connect: { id: payload.subjectId } },
        },
    });

    res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse(HttpStatus.CREATED, mark, "Mark added successfully"));
});

export { addMark };

