import { z } from "zod";

const addMarkValidator = z.object({
    studentId: z
        .string()
        .uuid(),
    subjectId: z
        .string()
        .uuid(),
    score: z
        .number()
        .min(0)
        .max(100),
    term: z
        .string(),
    year: z
        .number()
        .int()
        .min(1900)
        .max(2100)
});

export { addMarkValidator };