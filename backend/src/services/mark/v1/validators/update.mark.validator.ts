import { z } from "zod";

const updateMarkValidator = z.object({
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

export { updateMarkValidator };