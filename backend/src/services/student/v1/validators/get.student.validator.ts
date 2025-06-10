import { z } from "zod";

const getStudentValidator = z.object({
    id: z
        .string()
        .uuid("Id must be a valid UUID")
})
    .strict();

export { getStudentValidator };

