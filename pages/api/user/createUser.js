import { prisma } from '@/pages/api/server/db/prisma';
import { hash } from 'bcrypt';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { name, email, role, password, imageUrl, cpf, phoneNumber } =
        req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Esse email já existe' });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                role,
                password: hashedPassword,
                cpf: cpf || null,
                phoneNumber: phoneNumber || null,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
}
