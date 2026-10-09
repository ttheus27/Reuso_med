import { useState, useEffect, useCallback } from "react";

/**
 * Hook customizado para gerenciamento do quadro de tarefas (Kanban / Listas)
 */
export function useTasks(initialSort = "DUE_DATE") {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortStrategy, setSortStrategy] = useState(initialSort);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/tasks/transition?sort=${sortStrategy}`);
      if (!res.ok) throw new Error("Erro ao buscar tarefas");

      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("useTasks error:", err);
      setError(err.message || "Erro ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  }, [sortStrategy]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /**
   * Transiciona o status de uma tarefa via Template Method
   */
  const transitionTask = async (taskId, targetStatus) => {
    try {
      const res = await fetch("/api/tasks/transition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, targetStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Falha ao alterar status da tarefa");
      }

      await fetchTasks();
      return true;
    } catch (err) {
      console.error("Erro na transição:", err);
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    sortStrategy,
    setSortStrategy,
    transitionTask,
    refetch: fetchTasks,
  };
}

export default useTasks;
