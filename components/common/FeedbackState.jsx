import React from "react";

/**
 * Componentes de Feedback de Estado para a UI (Loading, Error, Empty State)
 */

export function LoadingSpinner({ message = "Carregando dados..." }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <div className="spinner-border text-primary mb-3" role="status" style={{ width: "2.5rem", height: "2.5rem" }}>
        <span className="visually-hidden">Carregando...</span>
      </div>
      <p className="text-muted fs-14 mb-0">{message}</p>
    </div>
  );
}

export function ErrorAlert({ message = "Ocorreu um erro ao carregar os dados.", onRetry }) {
  return (
    <div className="alert alert-danger d-flex align-items-center justify-content-between p-3 my-3" role="alert">
      <div className="d-flex align-items-center">
        <i className="ri-error-warning-line fs-20 me-2 text-danger" />
        <div>
          <span className="fw-semibold">Ops! </span>
          <span>{message}</span>
        </div>
      </div>
      {onRetry && (
        <button type="button" className="btn btn-sm btn-outline-danger ms-3" onClick={onRetry}>
          <i className="ri-refresh-line me-1" /> Tentar Novamente
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  title = "Nenhum registro encontrado",
  description = "Não há dados cadastrados para os filtros selecionados.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="text-center py-5 px-3">
      <div className="avatar avatar-xxl bg-light text-muted mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
        <i className="ri-inbox-archive-line fs-28" />
      </div>
      <h6 className="fw-semibold text-dark mb-1">{title}</h6>
      <p className="text-muted fs-13 mb-3" style={{ maxWidth: 400, margin: "0 auto" }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button type="button" className="btn btn-primary btn-sm" onClick={onAction}>
          <i className="ri-add-line me-1" /> {actionLabel}
        </button>
      )}
    </div>
  );
}
