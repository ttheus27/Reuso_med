import { useState, useEffect, useCallback } from "react";

/**
 * Hook customizado para gerenciamento e consumo de Faturas / Invoices
 */
export function useInvoices(initialFilters = {}) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.companyId) params.append("companyId", filters.companyId);

      // Busca na API
      const res = await fetch(`/api/server/db/invoice/getInvoices?${params.toString()}`);
      if (!res.ok) throw new Error("Erro ao buscar faturas");

      const data = await res.json();
      setInvoices(Array.isArray(data) ? data : data.invoices || []);
    } catch (err) {
      console.error("useInvoices error:", err);
      setError(err.message || "Erro desconhecido ao carregar faturas");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const exportInvoices = async (format = "CSV") => {
    try {
      const params = new URLSearchParams();
      params.append("format", format);
      if (filters.status) params.append("status", filters.status);
      if (filters.companyId) params.append("companyId", filters.companyId);

      window.open(`/api/invoice/export?${params.toString()}`, "_blank");
    } catch (err) {
      console.error("Erro ao exportar:", err);
    }
  };

  return {
    invoices,
    loading,
    error,
    filters,
    setFilters,
    refetch: fetchInvoices,
    exportInvoices,
  };
}

export default useInvoices;
