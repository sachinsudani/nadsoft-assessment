import { z } from "zod";

const listSubjectValidator = z.object({
    page: z
        .number()
        .min(1),
    limit: z
        .number()
        .min(1)
})
    .strict();

export { listSubjectValidator };

