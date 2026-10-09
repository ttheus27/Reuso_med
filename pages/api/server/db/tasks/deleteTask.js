import { prisma } from '../prisma';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'ID é obrigatório.' });
        }

        await prisma.task.delete({
            where: { id: Number(id) },
        });

        return res.status(204).end();
    } catch (err) {
        console.error('deleteTask error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
