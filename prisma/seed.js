// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@sistema.com';
    const plainPassword = 'Sucesso2025$$';
    const hashed = await bcrypt.hash(plainPassword, 10);

    const adminUser = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            name: 'Administrador',
            email,
            password: hashed,
            phoneNumber: '11999999999',
            cpf: '12345678900',
            role: 'ADMIN',
        },
    });

    console.log('✅ Usuário ADMIN criado/garantido');
    console.log('📧', adminUser.email);
    console.log('🔑', plainPassword);
    console.log('👤 role:', adminUser.role);

    // 1. Empresa 1 - Tech Solutions Ltda (Mensalidade Paga via PIX)
    let company1 = await prisma.company.findFirst({ where: { name: 'Tech Solutions Ltda' } });
    if (!company1) {
        company1 = await prisma.company.create({
            data: {
                name: 'Tech Solutions Ltda',
                responsible: 'Carlos Silva',
                email: 'carlos@techsolutions.com.br',
                phone: '(11) 98765-4321',
                whatsapp: '11987654321',
                cnpj: '12.345.678/0001-90',
                address: 'Av. Paulista, 1000',
                city: 'São Paulo',
                state: 'SP',
                zipCode: '01310-100',
                ownerId: adminUser.id,
            },
        });
    }

    const monthlyFee1 = await prisma.monthlyFee.create({
        data: {
            companyId: company1.id,
            amountCents: 150000, // R$ 1.500,00
            dueDay: 10,
            dueDate: new Date(),
            isActive: true,
        },
    });

    await prisma.payment.create({
        data: {
            companyId: company1.id,
            monthlyFeeId: monthlyFee1.id,
            userId: adminUser.id,
            amountCents: 150000,
            method: 'PIX',
            status: 'PAID',
            type: 'MENSALIDADE',
            createdAt: new Date(),
        },
    });

    // 2. Empresa 2 - Inovação & Design SA (Venda / Pagamento Pendente para teste do botão Aprovar)
    let company2 = await prisma.company.findFirst({ where: { name: 'Inovação & Design SA' } });
    if (!company2) {
        company2 = await prisma.company.create({
            data: {
                name: 'Inovação & Design SA',
                responsible: 'Mariana Costa',
                email: 'mariana@inovacao.com',
                phone: '(21) 97654-3210',
                whatsapp: '21976543210',
                cnpj: '98.765.432/0001-10',
                address: 'Rua do Ouvidor, 50',
                city: 'Rio de Janeiro',
                state: 'RJ',
                zipCode: '20040-030',
                ownerId: adminUser.id,
            },
        });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    await prisma.payment.create({
        data: {
            companyId: company2.id,
            userId: adminUser.id,
            amountCents: 325000, // R$ 3.250,00
            method: 'CARTAO',
            status: 'PENDING',
            type: 'VENDA',
            createdAt: yesterday,
        },
    });

    // 3. Empresa 3 - Global Commerce Eireli (Venda Avulsa / Boleto Pago)
    let company3 = await prisma.company.findFirst({ where: { name: 'Global Commerce Eireli' } });
    if (!company3) {
        company3 = await prisma.company.create({
            data: {
                name: 'Global Commerce Eireli',
                responsible: 'Roberto Almeida',
                email: 'roberto@globalcommerce.com',
                phone: '(31) 96543-2109',
                whatsapp: '31965432109',
                cnpj: '45.678.901/0001-23',
                address: 'Av. Afonso Pena, 1500',
                city: 'Belo Horizonte',
                state: 'MG',
                zipCode: '30130-005',
                ownerId: adminUser.id,
            },
        });
    }

    const sale3 = await prisma.sale.create({
        data: {
            userId: adminUser.id,
            description: 'Consultoria e Setup Inicial de E-commerce',
            amountCents: 85000, // R$ 850,00
        },
    });

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    await prisma.payment.create({
        data: {
            companyId: company3.id,
            saleId: sale3.id,
            userId: adminUser.id,
            amountCents: 85000,
            method: 'BOLETO',
            status: 'PAID',
            type: 'VENDA',
            createdAt: threeDaysAgo,
        },
    });

    console.log('✅ 3 Pagamentos de exemplo criados com sucesso!');
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
