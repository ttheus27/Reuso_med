import React from "react";

/**
 * Componente Reutilizável de Badge de Status com Estratégia de Cores e Ícones
 */
const STATUS_CONFIGS = {
  // Status de Fatura / Pagamento
  PAID: { label: "Pago", bgClass: "bg-success-transparent text-success", icon: "ri-check-line" },
  PENDING: { label: "Pendente", bgClass: "bg-warning-transparent text-warning", icon: "ri-time-line" },
  OVERDUE: { label: "Vencido", bgClass: "bg-danger-transparent text-danger", icon: "ri-error-warning-line" },
  CANCELED: { label: "Cancelado", bgClass: "bg-secondary-transparent text-secondary", icon: "ri-close-line" },

  // Status de Tarefa
  ABERTA: { label: "Aberta", bgClass: "bg-info-transparent text-info", icon: "ri-inbox-line" },
  EM_ANDAMENTO: { label: "Em Andamento", bgClass: "bg-primary-transparent text-primary", icon: "ri-play-line" },
  PAUSADA: { label: "Pausada", bgClass: "bg-warning-transparent text-warning", icon: "ri-pause-line" },
  CONCLUIDA: { label: "Concluída", bgClass: "bg-success-transparent text-success", icon: "ri-checkbox-circle-line" },

  // Prioridades
  ALTA: { label: "Alta", bgClass: "bg-danger-transparent text-danger", icon: "ri-arrow-up-line" },
  MEDIA: { label: "Média", bgClass: "bg-warning-transparent text-warning", icon: "ri-equal-line" },
  BAIXA: { label: "Baixa", bgClass: "bg-muted-transparent text-muted", icon: "ri-arrow-down-line" },
};

export default function StatusBadge({ status, showIcon = true, className = "" }) {
  const normalizedKey = String(status || "").toUpperCase();
  const config = STATUS_CONFIGS[normalizedKey] || {
    label: status || "N/A",
    bgClass: "bg-light text-dark",
    icon: "ri-information-line",
  };

  return (
    <span className={`badge ${config.bgClass} ${className}`} style={{ fontSize: "0.75rem", padding: "0.35em 0.65em" }}>
      {showIcon && config.icon && <i className={`${config.icon} me-1 align-middle`} />}
      {config.label}
    </span>
  );
}
