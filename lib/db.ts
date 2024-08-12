import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;


// this doesnt work unfortunately cuz of nextjs hot reload (which will lead to too many prismaclients running thats why we added if we aint in prodcution we store it in globalthis.prisma (which will be already there so hot reload wont mess with creating new client each time (cuz globalthis aint affected by hot reload)))
// this can workout in production but while developiong this works
// export const db =new PrismaClient();