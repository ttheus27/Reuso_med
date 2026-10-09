/**
 * Utilitários puros e reutilizáveis de formatação para o Front-end
 */

/**
 * Converte valor em centavos para string formatada em Real (BRL)
 * @param {number} cents - Valor em centavos (ex: 150000)
 * @returns {string} - Ex: "R$ 1.500,00"
 */
export function formatCurrency(cents) {
  if (cents === null || cents === undefined || isNaN(cents)) return "R$ 0,00";
  return (Number(cents) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Formata data no padrão brasileiro (DD/MM/YYYY)
 * @param {string|Date} dateInput
 * @returns {string} - Ex: "15/10/2026"
 */
export function formatDate(dateInput) {
  if (!dateInput) return "-";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("pt-BR");
}

/**
 * Formata data e hora no padrão brasileiro (DD/MM/YYYY HH:mm)
 */
export function formatDateTime(dateInput) {
  if (!dateInput) return "-";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

/**
 * Formata CNPJ (99.999.999/9999-99) ou CPF (999.999.999-99)
 */
export function formatDocument(doc) {
  if (!doc) return "-";
  const clean = String(doc).replace(/\D/g, "");
  if (clean.length === 11) {
    return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  if (clean.length === 14) {
    return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
  return doc;
}

/**
 * Formata telefone / celular brasileiro
 */
export function formatPhone(phone) {
  if (!phone) return "-";
  const clean = String(phone).replace(/\D/g, "");
  if (clean.length === 11) {
    return clean.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  if (clean.length === 10) {
    return clean.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return phone;
}
