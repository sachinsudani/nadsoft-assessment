import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { HttpStatus } from "../../../enums";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { getMarkValidator } from "./validators/get.mark.validator";
import { updateMarkValidator } from "./validators/update.mark.validator";
import { ApiError } from "../../../utils/ApiError";

const updateMark: RequestHandler = asyncHandler(async (req, res) => {
    const { id: markId } = getMarkValidator.parse(req.params);
    const payload = updateMarkValidator.parse(req.body);

    const markExists = await prisma.mark.findUnique({ where: { id: markId } });

    if (!markExists) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Mark not found");
    }

    const mark = await prisma.mark.update({
        where: { id: markId },
        data: {
            score: payload.score,
            term: payload.term,
            year: payload.year,
        },
    });

    res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, mark, "Mark updated successfully"));
});

export { updateMark };

