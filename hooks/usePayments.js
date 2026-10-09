import { useState, useCallback } from "react";

/**
 * Hook customizado para processamento de pagamentos com Strategy
 */
export function usePayments() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const processPayment = useCallback(async (paymentData) => {
    try {
      setProcessing(true);
      setError(null);

      const res = await fetch("/api/payments/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Falha ao processar pagamento");
      }

      return data;
    } catch (err) {
      console.error("usePayments error:", err);
      setError(err.message || "Erro desconhecido ao processar pagamento");
      throw err;
    } finally {
      setProcessing(false);
    }
  }, []);

  return {
    processPayment,
    processing,
    error,
  };
}

export default usePayments;
