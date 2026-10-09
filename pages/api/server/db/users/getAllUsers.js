import { prisma } from '../prisma';

export async function getAllUsers() {
    return prisma.user.findMany({
        orderBy: [{ name: 'asc' }, { email: 'asc' }],
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            cpf: true, // 👈 adicionar
            phoneNumber: true, // 👈 adicionar
        },
    });
}

export default async function handler(req, res) {
    if (req.method !== 'GET')
        return res.status(405).json({ error: 'Method not allowed' });
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (e) {
        console.error('getAllUsers error:', e);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
}
