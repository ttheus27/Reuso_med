// pages/api/server/db/tasks/updateTask.js
import { prisma } from '../prisma';
import { getWorkflowForTransition } from '../../../../../patterns/template-method/TaskWorkflowTemplate';

export default async function handler(req, res) {
    console.log('\n===== 🔵 UPDATE TASK API CALLED =====');

    if (req.method !== 'PUT' && req.method !== 'PATCH') {
        console.log('❌ Método não permitido:', req.method);
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        console.log('📥 Body recebido:', req.body);

        const {
            id,
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

        if (!id) {
            console.log('❌ Falha: ID ausente no body');
            return res.status(400).json({ message: 'ID é obrigatório.' });
        }

        // 📌 Buscar estado atual
        const current = await prisma.task.findUnique({
            where: { id: Number(id) },
            select: {
                status: true,
                startedAt: true,
                lastResumeAt: true,
                pausedAt: true,
                finishedAt: true,
                totalTimeWorked: true,
            },
        });

        console.log('📌 Estado atual da tarefa:', current);

        if (!current) {
            console.log('❌ Tarefa não encontrada no banco!');
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }

        const now = new Date();
        const data = {};

        // campos normais
        if (title !== undefined) data.title = title;
        if (priority !== undefined) data.priority = priority;
        if (companyId !== undefined) data.companyId = Number(companyId);
        if (assigneeId !== undefined)
            data.assigneeId = assigneeId ? Number(assigneeId) : null;
        if (dueDate !== undefined)
            data.dueDate = dueDate ? new Date(dueDate) : null;
        if (attachmentUrl !== undefined)
            data.attachmentUrl = attachmentUrl || null;
        if (attachmentFilename !== undefined)
            data.attachmentFilename = attachmentFilename || null;
        if (attachmentMime !== undefined)
            data.attachmentMime = attachmentMime || null;

        // Aplicação do Padrão GoF: TEMPLATE METHOD (TaskWorkflowTemplate)
        let activeWorkflow = null;
        if (status) {
            const newStatus = String(status).toUpperCase();
            activeWorkflow = getWorkflowForTransition(newStatus, current.status);

            if (activeWorkflow) {
                console.log(`🎯 [Template Method] Delegando transição de status para: ${activeWorkflow.constructor.name}`);
                const workflowData = activeWorkflow.calculateTimestamps(current);
                Object.assign(data, workflowData);
            } else {
                data.status = newStatus;
            }
        }

        console.log('📤 DATA FINAL ENVIADA PARA PRISMA:', data);

        const task = await prisma.task.update({
            where: { id: Number(id) },
            data,
            include: { company: true, assignee: true },
        });

        // Hook de pós-transição do Template Method
        if (activeWorkflow) {
            await activeWorkflow.afterTransition(task);
        }

        console.log('🟢 TASK ATUALIZADA COM SUCESSO:', task);

        // 🔁 normalizar no mesmo formato do getTasks
        const mapped = {
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
            attachmentUrl: task.attachmentUrl || null,
            attachmentFilename: task.attachmentFilename || null,
            attachmentMime: task.attachmentMime || null,
            startedAt: task.startedAt ? task.startedAt.toISOString() : null,
            lastResumeAt: task.lastResumeAt
                ? task.lastResumeAt.toISOString()
                : null,
            pausedAt: task.pausedAt ? task.pausedAt.toISOString() : null,
            finishedAt: task.finishedAt ? task.finishedAt.toISOString() : null,
            totalTimeWorked: task.totalTimeWorked ?? 0,
        };

        console.log('===== 🟩 UPDATE TASK FINISHED =====\n');

        return res.status(200).json({ task: mapped });
    } catch (err) {
        console.error('🔥 ERRO NO updateTask:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
