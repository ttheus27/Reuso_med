/**
 * Script de Demonstração Prática — Database First
 * Disciplina: Engenharia de Reúso de Software
 * 
 * Este script demonstra como manipular dados utilizando as classes e métodos CRUD
 * gerados automaticamente pelo Prisma Client a partir do banco de dados relacional.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function runDemo() {
  console.log("==========================================================");
  console.log("🚀 DEMONSTRAÇÃO PRÁTICA: DATABASE FIRST COM PRISMA ORM");
  console.log("==========================================================\n");

  try {
    // 1. Consulta automática via métodos gerados
    console.log("📦 1. Lendo dados existentes do banco através das classes geradas...");
    const companies = await prisma.company.findMany({
      take: 3,
      select: { id: true, name: true, cnpj: true, city: true },
    });
    console.log(`Encontradas ${companies.length} empresas cadastradas:`);
    console.table(companies);

    // 2. Criação automática de registro (CRUD - Create)
    console.log("\n📝 2. Criando um novo registro de teste via método gerado (create)...");
    const testUser = await prisma.user.findFirst();
    
    if (testUser) {
      const timestamp = Date.now();
      const newCompany = await prisma.company.create({
        data: {
          name: `Empresa Demonstração Database First #${timestamp.toString().slice(-4)}`,
          cnpj: `99.999.${timestamp.toString().slice(-3)}/0001-99`,
          email: `contato_${timestamp}@databasefirst.com`,
          city: "Recife",
          state: "PE",
          ownerId: testUser.id,
        },
      });

      console.log("✅ Nova empresa criada com sucesso pelo Prisma Client gerado:");
      console.log(`   ID: ${newCompany.id}`);
      console.log(`   Nome: ${newCompany.name}`);
      console.log(`   CNPJ: ${newCompany.cnpj}`);

      // 3. Atualização de registro (CRUD - Update)
      console.log("\n✏️ 3. Atualizando o registro recém-criado (update)...");
      const updated = await prisma.company.update({
        where: { id: newCompany.id },
        data: { notes: "Empresa validada na demonstração ao vivo de Database First!" },
      });
      console.log(`✅ Observação atualizada: "${updated.notes}"`);

      // 4. Exclusão de registro (CRUD - Delete)
      console.log("\n🗑️ 4. Removendo registro de teste para manter a base limpa (delete)...");
      await prisma.company.delete({
        where: { id: newCompany.id },
      });
      console.log(`✅ Empresa ID ${newCompany.id} removida com sucesso!`);
    }

    console.log("\n==========================================================");
    console.log("🎉 Ciclo completo CRUD gerado por Database First validado com sucesso!");
    console.log("💡 Para abrir o painel visual com todas as telas e tabelas:");
    console.log("   Execute: npx prisma studio");
    console.log("==========================================================");
  } catch (error) {
    console.error("❌ Erro na execução da demonstração:", error);
  } finally {
    await prisma.$disconnect();
  }
}

runDemo();
