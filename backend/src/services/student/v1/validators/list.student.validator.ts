import { z } from "zod";

const listStudentValidator = z.object({
    page: z
        .number()
        .min(1),
    limit: z
        .number()
        .min(1)
})
    .strict();

export { listStudentValidator };
