import { prisma } from '@/pages/api/server/db/prisma';

export default async function handler(req, res) {
  // 🔴 DESATIVA CACHE (evita 304)
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email é obrigatório' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
        cpf: true,
        // ❌ suspended REMOVIDO
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
}
