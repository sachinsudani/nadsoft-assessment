import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { HttpStatus } from "../../../enums";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { listSubjectValidator } from "./validators/list.subject.validator";

const listSubjects: RequestHandler = asyncHandler(async (req, res) => {
    const query = listSubjectValidator.parse({
        page: +req.query.page,
        limit: +req.query.limit
    });

    const [subjects, count] = await Promise.all([
        prisma.subject.findMany({
            skip: (query.page - 1) * query.limit,
            take: query.limit,
            orderBy: {
                createdAt: "desc"
            },
        }),
        prisma.subject.count()
    ]);

    res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, subjects, "Subjects retrieved successfully", count));
});

export { listSubjects };

