import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { HttpStatus } from "../../../enums";
import { ApiError } from "../../../utils/ApiError";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { getMarkValidator } from "./validators/get.mark.validator";

const deleteMark: RequestHandler = asyncHandler(async (req, res) => {
    const { id: markId } = getMarkValidator.parse(req.params);

    const markExists = await prisma.mark.findUnique({ where: { id: markId } });

    if (!markExists) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Mark not found");
    }

    await prisma.mark.delete({ where: { id: markId }, });

    res
        .status(HttpStatus.NO_CONTENT)
        .json(new ApiResponse(HttpStatus.OK, null, "Mark deleted successfully"));
});

export { deleteMark };

