// pages/api/server/db/tasks/createTask.js
import { prisma } from '../prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const {
            title,
            companyId,
            assigneeId,
            priority,
            status,
            dueDate,
            attachmentUrl,
            attachmentFilename,
            attachmentMime,
        } = req.body || {};

        if (!title || typeof title !== 'string') {
            return res.status(400).json({ message: 'Título é obrigatório.' });
        }

        if (!companyId) {
            return res
                .status(400)
                .json({ message: 'Empresa (companyId) é obrigatória.' });
        }

        const data = {
            title: title.trim(),
            companyId: Number(companyId),
            priority: priority || 'MEDIA', // TaskPriority
            status: status || 'ABERTA', // TaskStatus
        };

        if (assigneeId) {
            data.assigneeId = Number(assigneeId);
        }

        if (dueDate) {
            data.dueDate = new Date(dueDate);
        }

        if (attachmentUrl) data.attachmentUrl = attachmentUrl;
        if (attachmentFilename) data.attachmentFilename = attachmentFilename;
        if (attachmentMime) data.attachmentMime = attachmentMime;

        const task = await prisma.task.create({
            data,
            include: {
                company: true,
                assignee: true,
            },
        });

        const result = {
            id: task.id,
            title: task.title,
            companyId: task.companyId,
            company: task.company?.name ?? '',
            assigneeId: task.assigneeId ?? null,
            responsibleName: task.assignee?.name ?? '',
            responsibleEmail: task.assignee?.email ?? '',
            priority: task.priority,
            status: task.status,
            createdAt: task.createdAt.toISOString(),
            dueDate: task.dueDate ? task.dueDate.toISOString() : null,
            attachmentUrl: task.attachmentUrl ?? null,
            attachmentFilename: task.attachmentFilename ?? null,
            attachmentMime: task.attachmentMime ?? null,
        };

        return res.status(201).json({ task: result });
    } catch (err) {
        console.error('createTask error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
