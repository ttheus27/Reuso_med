// pages/api/server/db/prisma.js
import prisma from "../../../../patterns/singleton/DatabaseConnection";

export const db = prisma;
export { prisma };
export default prisma;

