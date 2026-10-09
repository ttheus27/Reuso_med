// pages/api/server/db/users/getActiveTaskForUser.js
import { prisma } from '../prisma';

function computeWorkedMs(task) {
    // ⚠️ Aqui é só o acumulado persistido no banco.
    // NÃO usar Date.now() aqui, o "tempo correndo" é responsabilidade do client.
    return task.totalTimeWorked ?? 0;
}

function formatWorkedTime(ms) {
    const totalSeconds = Math.floor((ms ?? 0) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export async function getActiveTaskForUser(email) {
    if (!email) {
        return { hasActiveTask: false, activeTask: null };
    }

    const query = `
        SELECT 
            t.id,
            t.title,
            t.status,
            t.startedAt,
            t.lastResumeAt,
            t.finishedAt,
            t.totalTimeWorked,
            t.companyId,
            t.assigneeId
        FROM Task t
        INNER JOIN User u ON u.id = t.assigneeId
        WHERE u.email = ?
          AND t.status = 'EM_ANDAMENTO'
          AND t.startedAt IS NOT NULL
          AND t.finishedAt IS NULL
        ORDER BY t.startedAt DESC
        LIMIT 1;
    `;

    const rows = await prisma.$queryRawUnsafe(query, email);
    const task = rows?.[0];

    if (!task) {
        return {
            hasActiveTask: false,
            activeTask: null,
        };
    }

    const workedMs = computeWorkedMs(task);

    return {
        hasActiveTask: true,
        activeTask: {
            id: task.id,
            title: task.title,
            status: task.status,
            startedAt: task.startedAt,
            lastResumeAt: task.lastResumeAt,
            totalTimeWorkedMs: workedMs,
            totalTimeWorkedHuman: formatWorkedTime(workedMs),
            companyId: task.companyId,
            assigneeId: task.assigneeId,
        },
    };
}
