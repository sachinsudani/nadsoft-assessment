import { z } from "zod";

const addStudentValidator = z.object({
    firstName: z
        .string()
        .min(1, "First name is required"),
    lastName: z
        .string()
        .min(1, "Last name is required"),
    email: z
        .string()
        .email("Invalid email format"),
    class: z
        .string()
        .min(1, "Class is required"),
    age: z
        .number()
        .min(1, "Age is required"),
}).strict();

export { addStudentValidator };
