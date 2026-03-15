// Use a singleton for the Prisma Client to avoid exhausting the database connection pool.
import { PrismaClient } from "./generated/client_v2";

const globalForPrisma = global as unknown as { prismaV2: PrismaClient };

const url = process.env.DIRECT_URL || process.env.DATABASE_URL;

export const prisma =
    globalForPrisma.prismaV2 ||
    (url
        ? new PrismaClient({ datasourceUrl: url })
        : new PrismaClient());

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaV2 = prisma;

// Graceful shutdown — ensures DB connections are released cleanly
if (typeof process !== 'undefined') {
    process.on('beforeExit', async () => {
        await prisma.$disconnect();
    });
}

