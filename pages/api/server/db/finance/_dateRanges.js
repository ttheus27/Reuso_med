// util pra transformar ?range=... & from=... & to=... em datas
import {
  endOfDay,
  endOfMonth,
  parseISO,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";

export function resolveRange({ range = "today", from, to }) {
  const now = new Date();

  switch (range) {
    case "today": {
      return {
        start: startOfDay(now),
        end: endOfDay(now),
        label: "Hoje",
      };
    }
    case "yesterday": {
      const y = subDays(now, 1);
      return { start: startOfDay(y), end: endOfDay(y), label: "Ontem" };
    }
    case "last7": {
      const start = startOfDay(subDays(now, 6)); // inclui hoje
      const end = endOfDay(now);
      return { start, end, label: "Últimos 7 dias" };
    }
    case "last90": {
      const start = startOfDay(subDays(now, 89)); // inclui hoje
      const end = endOfDay(now);
      return { start, end, label: "Últimos 90 dias" };
    }
    case "thisMonth": {
      return {
        start: startOfMonth(now),
        end: endOfMonth(now),
        label: "Este mês",
      };
    }
    case "lastMonth": {
      const m = subMonths(now, 1);
      return {
        start: startOfMonth(m),
        end: endOfMonth(m),
        label: "Mês passado",
      };
    }
    case "custom": {
      // from/to em yyyy-mm-dd
      const s = from ? startOfDay(parseISO(from)) : startOfMonth(now);
      const e = to ? endOfDay(parseISO(to)) : endOfMonth(now);
      return { start: s, end: e, label: "Personalizado" };
    }
    default:
      return {
        start: startOfDay(now),
        end: endOfDay(now),
        label: "Hoje",
      };
  }
}
