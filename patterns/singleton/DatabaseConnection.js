import { PrismaClient } from "@prisma/client";

/**
 * Padrão GoF: SINGLETON
 * Garante uma única instância do cliente Prisma em toda a aplicação Node.js / Next.js,
 * prevenindo esgotamento de conexões no pool em ambiente serverless/desenvolvimento.
 */
class DatabaseConnection {
  constructor() {
    if (!DatabaseConnection.instance) {
      const globalForPrisma = globalThis;

      if (!globalForPrisma.__prismaInstance) {
        globalForPrisma.__prismaInstance = new PrismaClient({
          log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
        });
      }

      this.client = globalForPrisma.__prismaInstance;
      DatabaseConnection.instance = this;
    }
    return DatabaseConnection.instance;
  }

  getClient() {
    return this.client;
  }
}

const instance = Object.freeze(new DatabaseConnection());
export const prisma = instance.getClient();
export default prisma;
