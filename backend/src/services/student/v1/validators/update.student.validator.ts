import { z } from "zod";

export const updateStudentValidator = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    class: z.string().optional(),
    age: z.number().int().optional(),
});
