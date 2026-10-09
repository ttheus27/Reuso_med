import { prisma } from '../prisma';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const tasks = await prisma.task.findMany({
            orderBy: { dueDate: 'asc' },
            include: {
                company: true,
                assignee: true,
            },
        });

        const result = tasks.map((task) => ({
            id: task.id,
            title: task.title,
            companyId: task.companyId,
            company: task.company?.name ?? '',
            responsibleName: task.assignee?.name ?? '',
            responsibleEmail: task.assignee?.email ?? '',
            priority: task.priority,
            status: task.status,
            createdAt: task.createdAt?.toISOString?.() ?? null,
            dueDate: task.dueDate ? task.dueDate.toISOString() : null,

            // briefing
            attachmentUrl: task.attachmentUrl || null,
            attachmentFilename: task.attachmentFilename || null,
            attachmentMime: task.attachmentMime || null,

            // timer
            startedAt: task.startedAt ? task.startedAt.toISOString() : null,
            finishedAt: task.finishedAt ? task.finishedAt.toISOString() : null,
        }));

        return res.status(200).json({ tasks: result });
    } catch (err) {
        console.error('getTasks error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
