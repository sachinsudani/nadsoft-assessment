import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpStatus } from "../enums";
import { ApiError } from "../utils/ApiError";

function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    let apiError: ApiError;

    if (err instanceof ZodError) {
        apiError = new ApiError(
            HttpStatus.BAD_REQUEST,
            `${err.errors[0].path}: ${err.errors[0].message}`,
            err.errors.map((el) => `${el.path}: ${el.message}`),
            err.stack
        );
    } else if (err instanceof PrismaClientKnownRequestError) {
        const message = `${err.meta?.modelName}: ${err.meta?.cause}`;
        apiError = new ApiError(HttpStatus.BAD_REQUEST, message, [message], err.stack);
    } else if (err instanceof ApiError) {
        apiError = err;
    } else {
        apiError = new ApiError(
            HttpStatus.SERVER_ERROR,
            err.message || "Internal Server Error",
            [err.message || "Internal Server Error"],
            err.stack
        );
    }

    const response = {
        ...apiError,
        message: apiError.message,
        ...(process.env.NODE_ENV === "development" ? { stack: apiError.stack } : {}),
    };

    res.status(apiError.statusCode).json(response);
}

export { errorHandler };

