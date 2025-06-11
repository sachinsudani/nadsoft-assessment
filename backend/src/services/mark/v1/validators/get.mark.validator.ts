import { z } from "zod";

const getMarkValidator = z.object({
    id: z
        .string()
        .uuid("Id must be a valid UUID")
})
    .strict();

export { getMarkValidator };

