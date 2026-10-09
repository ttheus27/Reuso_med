import {
    addMonths,
    endOfMonth,
    startOfDay,
    startOfMonth,
    subDays,
} from 'date-fns';

// Retorna o início e fim de “hoje”, “ontem”, “última semana” etc (em hora local do servidor)
export function todayRange() {
    const start = startOfDay(new Date());
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
    return { start, end };
}
export function yesterdayRange() {
    const { start } = todayRange();
    const startY = subDays(start, 1);
    const endY = new Date(start.getTime() - 1);
    return { start: startY, end: endY };
}

export function last7DaysRange() {
    const end = new Date();
    const start = subDays(end, 7);
    return { start, end };
}
export function prev7DaysRange() {
    const end = subDays(new Date(), 7);
    const start = subDays(end, 7);
    return { start, end };
}

export function monthRange(date = new Date()) {
    return { start: startOfMonth(date), end: endOfMonth(date) };
}
export function monthsBack(n = 6) {
    const arr = [];
    const now = new Date();
    for (let i = n - 1; i >= 0; i--) {
        const d = addMonths(startOfMonth(now), -i);
        arr.push({ date: d, ...monthRange(d) });
    }
    return arr;
}

export function centsToBRL(cents) {
    return (cents || 0) / 100;
}
