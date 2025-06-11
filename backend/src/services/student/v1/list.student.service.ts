import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { HttpStatus } from "../../../enums";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { listStudentValidator } from "./validators/list.student.validator";

const listStudents: RequestHandler = asyncHandler(async (req, res) => {
    const query = listStudentValidator.parse({
        page: +req.query.page,
        limit: +req.query.limit
    });

    const [students, count] = await Promise.all([
        prisma.student.findMany({
            skip: (query.page - 1) * query.limit,
            take: query.limit,
            orderBy: {
                createdAt: "desc"
            },
        }),
        prisma.student.count()
    ]);

    res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, students, "Students retrieved successfully", count));
});

export { listStudents };
