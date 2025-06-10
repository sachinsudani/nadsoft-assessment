import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log(`☘️  PostgresSql Connected!`);
    } catch (error) {
        console.log("PostgresSql connection error: ", error);
        process.exit(1);
    }
};

export { connectDB, prisma };
