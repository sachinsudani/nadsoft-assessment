const prisma = new PrismaClient();
import { PrismaClient } from '@prisma/client';

const subjects = [
    {
        name: "Mathematics",
        code: "MATH101",
        department: "Science",
    },
    {
        name: "Physics",
        code: "PHYS101",
        department: "Science",
    },
    {
        name: "Chemistry",
        code: "CHEM101",
        department: "Science",
    },
    {
        name: "Biology",
        code: "BIO101",
        department: "Science",
    },
    {
        name: "History",
        code: "HIST101",
        department: "Arts",
    },
    {
        name: "Geography",
        code: "GEOG101",
        department: "Arts",
    },
    {
        name: "English Literature",
        code: "ENG101",
        department: "Arts",
    },
    {
        name: "Computer Science",
        code: "CS101",
        department: "Technology",
    },
    {
        name: "Economics",
        code: "ECO101",
        department: "Commerce",
    },
];

subjects.forEach(async (subject) => {
    try {
        await prisma.subject.create({
            data: subject,
        });
        console.log(`Subject ${subject.name} created successfully.`);
    } catch (error) {
        console.error(`Error creating subject ${subject.name}:`, error);
    }
});