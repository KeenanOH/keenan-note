import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
    datasourceUrl: "postgresql://postgres:password@localhost:5433/tests"
})
