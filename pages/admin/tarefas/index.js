"use client";

import Pageheader from "@/shared/layout-components/pageheader/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import { uploadFileToFirebase } from "@/utils/firebaseUpload";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { FaPause, FaPlay, FaList, FaThLarge } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import styles from "./styles.module.scss";

const emptyForm = {
  title: "",
  company: "",
  companyId: null,
  assigneeId: null,
  responsibleName: "",
  responsibleEmail: "",
  priority: "media",
  status: "aberta",
  dueDate: "",
  attachmentUrl: "",
  attachmentFilename: "",
  attachmentMime: "",
};

export default function TarefasPage() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // ⬅ default "Todos"
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortDir, setSortDir] = useState("asc");

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [saving, setSaving] = useState(false);

  const [companyResults, setCompanyResults] = useState([]);
  const [companyLoading, setCompanyLoading] = useState(false);

  const [assigneeResults, setAssigneeResults] = useState([]);
  const [assigneeLoading, setAssigneeLoading] = useState(false);

  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [userFilter, setUserFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [busy, setBusy] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // 'table' ou 'kanban'

  // sessão do usuário logado (client)
  const { data: session, update } = useSession();
  const currentUserEmail = (session?.user?.email || "").trim().toLowerCase();

  // resetar página quando filtros / ordenação mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [q, statusFilter, userFilter, sortBy, sortDir, tasks.length]);

  // opções de usuários para o filtro (deduzido das tarefas carregadas)
  const assigneeFilterOptions = useMemo(() => {
    const map = new Map();

    tasks.forEach((t) => {
      const email = (t.responsibleEmail || "").trim();
      const name = (t.responsibleName || "").trim();

      const key = email || name;
      if (!key) return;
      if (map.has(key)) return;

      map.set(key, {
        key,
        name: name || "(sem nome)",
        email,
      });
    });

    return Array.from(map.values()).sort((a, b) =>
      (a.name || "").localeCompare(b.name || "")
    );
  }, [tasks]);

  // carregar tarefas
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/server/db/tasks/getTasks");
        if (!res.ok) {
          console.error("Erro ao buscar tarefas", await res.text());
          setTasks([]);
          return;
        }
        const data = await res.json();
        const list = Array.isArray(data?.tasks) ? data.tasks : [];
        console.log("tasks list", list);
        setTasks(list);
      } catch (err) {
        console.error("Erro ao buscar tarefas", err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleAttachmentChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedMimes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (
      !allowedMimes.includes(file.type) &&
      !["pdf", "doc", "docx"].includes(ext)
    ) {
      alert("Envie apenas arquivos PDF ou Word (.doc, .docx).");
      return;
    }

    try {
      setBusy(true);
      setUploadingAttachment(true);

      const uploaded = await uploadFileToFirebase(file, {
        folder: "tasks",
        entityId: editingTask?.id,
      });

      handleFormChange("attachmentUrl", uploaded.url);
      handleFormChange("attachmentFilename", uploaded.filename || file.name);
      handleFormChange("attachmentMime", uploaded.mimeType || file.type);
    } catch (err) {
      console.error("Erro ao fazer upload do anexo", err);
      alert("Erro ao fazer upload do anexo.");
    } finally {
      setUploadingAttachment(false);
      setBusy(false);
    }
  };

  // busca empresas
  const searchCompanies = async (term) => {
    if (!term || term.length < 2) {
      setCompanyResults([]);
      return;
    }

    try {
      setCompanyLoading(true);
      const res = await fetch(
        `/api/server/db/company/search?q=${encodeURIComponent(term)}`
      );
      if (!res.ok) {
        console.error("Erro ao buscar empresas", await res.text());
        setCompanyResults([]);
        return;
      }
      const data = await res.json();
      setCompanyResults(data?.companies || []);
    } catch (err) {
      console.error("Erro ao buscar empresas", err);
      setCompanyResults([]);
    } finally {
      setCompanyLoading(false);
    }
  };

  // busca usuários
  const searchUsers = async (term) => {
    if (!term || term.length < 2) {
      setAssigneeResults([]);
      return;
    }

    try {
      setAssigneeLoading(true);
      const res = await fetch(
        `/api/server/db/users/search?q=${encodeURIComponent(term)}`
      );
      if (!res.ok) {
        console.error("Erro ao buscar usuários", await res.text());
        setAssigneeResults([]);
        return;
      }
      const data = await res.json();
      setAssigneeResults(data?.users || []);
    } catch (err) {
      console.error("Erro ao buscar usuários", err);
      setAssigneeResults([]);
    } finally {
      setAssigneeLoading(false);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    try {
      const d = new Date(iso);
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(d);
    } catch {
      return "—";
    }
  };

  const priorityLabel = (p) => {
    const v = String(p || "").toLowerCase();
    switch (v) {
      case "alta":
        return "Alta";
      case "media":
        return "Média";
      case "baixa":
        return "Baixa";
      default:
        return "—";
    }
  };

  const statusLabel = (s) => {
    const v = String(s || "").toLowerCase();
    switch (v) {
      case "aberta":
        return "Aberta";
      case "em_andamento":
        return "Em andamento";
      case "em_teste":
        return "Em teste";
      case "concluida":
        return "Concluída";
      case "atrasada":
        return "Atrasada";
      default:
        return "—";
    }
  };

  const priorityWeight = (p) => {
    const v = String(p || "").toLowerCase();
    switch (v) {
      case "alta":
        return 3;
      case "media":
        return 2;
      case "baixa":
        return 1;
      default:
        return 0;
    }
  };

  const totalTasks = useMemo(() => tasks.length, [tasks]);
  const openTasks = useMemo(
    () =>
      tasks.filter((t) => {
        const s = String(t.status || "").toLowerCase();
        return s === "aberta" || s === "em_andamento";
      }).length,
    [tasks]
  );
  const overdueTasks = useMemo(
    () =>
      tasks.filter((t) => String(t.status || "").toLowerCase() === "atrasada")
        .length,
    [tasks]
  );

  const filteredSorted = useMemo(() => {
    const term = q.trim().toLowerCase();

    let filtered = tasks;

    if (term) {
      filtered = filtered.filter((t) => {
        const companyName =
          t.company && typeof t.company === "object"
            ? t.company.name || ""
            : t.company || "";

        return (
          (t.title || "").toLowerCase().includes(term) ||
          companyName.toLowerCase().includes(term) ||
          (t.responsibleName || "").toLowerCase().includes(term) ||
          (t.responsibleEmail || "").toLowerCase().includes(term)
        );
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (t) => String(t.status || "").toLowerCase() === statusFilter
      );
    }

    if (userFilter !== "all") {
      filtered = filtered.filter((t) => {
        const email = (t.responsibleEmail || "").trim();
        const name = (t.responsibleName || "").trim();
        const key = email || name;
        return key === userFilter;
      });
    }

    const dir = sortDir === "asc" ? 1 : -1;

    const sorted = [...filtered].sort((a, b) => {
      const getKey = (x) => {
        switch (sortBy) {
          case "priority":
            return priorityWeight(x.priority);
          case "createdAt":
            return x.createdAt ? new Date(x.createdAt).getTime() : 0;
          case "dueDate":
          default:
            return x.dueDate ? new Date(x.dueDate).getTime() : 0;
        }
      };
      const A = getKey(a);
      const B = getKey(b);

      if (A < B) return -1 * dir;
      if (A > B) return 1 * dir;
      return (a.title || "").localeCompare(b.title || "") * dir;
    });

    return sorted;
  }, [tasks, q, statusFilter, sortBy, sortDir, userFilter]);

  // paginação
  const totalFiltered = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const startIndex = (currentPageSafe - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTasks = useMemo(
    () => filteredSorted.slice(startIndex, endIndex),
    [filteredSorted, startIndex, endIndex]
  );

  const openNewModal = () => {
    setEditingTask(null);
    setForm(emptyForm);
    setCompanyResults([]);
    setAssigneeResults([]);
    setShowModal(true);
  };

  const openEditModal = (task) => {
    const companyName =
      task.company && typeof task.company === "object"
        ? task.company.name || ""
        : task.company || "";

    setEditingTask(task);
    setForm({
      title: task.title || "",
      company: companyName,
      companyId: task.companyId ?? null,
      assigneeId: task.assigneeId ?? null,
      responsibleName: task.responsibleName || "",
      responsibleEmail: task.responsibleEmail || "",
      priority: String(task.priority || "media").toLowerCase(),
      status: String(task.status || "aberta").toLowerCase(),
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().slice(0, 10)
        : "",
      attachmentUrl: task.attachmentUrl || "",
      attachmentFilename: task.attachmentFilename || "",
      attachmentMime: task.attachmentMime || "",
    });
    setCompanyResults([]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCompanyResults([]);
    setAssigneeResults([]);
  };

  const handleFormChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSaveTask = async () => {
    if (!form.title.trim()) return;
    if (saving) return;

    const dueIso =
      form.dueDate && form.dueDate.length === 10
        ? form.dueDate + "T23:59:59.000Z"
        : null;

    const payload = {
      title: form.title.trim(),
      priority: String(form.priority || "media").toUpperCase(),
      status: String(form.status || "aberta").toUpperCase(),
      dueDate: dueIso,
      companyId: form.companyId ? Number(form.companyId) : null,
      attachmentUrl: form.attachmentUrl || null,
      attachmentFilename: form.attachmentFilename || null,
      attachmentMime: form.attachmentMime || null,
    };

    if (form.companyId) {
      payload.companyId = Number(form.companyId);
    }
    if (form.assigneeId) {
      payload.assigneeId = Number(form.assigneeId);
    }

    setSaving(true);
    setBusy(true);

    try {
      if (editingTask) {
        const res = await fetch("/api/server/db/tasks/updateTask", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingTask.id, ...payload }),
        });

        if (!res.ok) {
          console.error("Erro ao atualizar tarefa", await res.text());
          return;
        }

        const data = await res.json();
        const updated = data?.task;

        setTasks((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
      } else {
        const res = await fetch("/api/server/db/tasks/createTask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.error("Erro ao criar tarefa", await res.text());
          return;
        }

        const data = await res.json();
        const created = data?.task;

        setTasks((prev) => [...prev, created]);
      }

      setShowModal(false);
      setCompanyResults([]);
      setAssigneeResults([]);
    } catch (err) {
      console.error("Erro ao salvar tarefa", err);
    } finally {
      setSaving(false);
      setBusy(false);
    }
  };

  // helper: usuário pode controlar essa tarefa?
  const canControlTask = (task) => {
    if (!currentUserEmail) return false;
    const taskEmail = (task.responsibleEmail || "").trim().toLowerCase();
    return taskEmail && taskEmail === currentUserEmail;
  };

  const handleToggleTaskTimer = async (task) => {
    setBusy(true);

    const statusLower = String(task.status || "").toLowerCase();
    const isRunning =
      statusLower === "em_andamento" && task.startedAt && !task.finishedAt;

    const payload = {
      id: task.id,
      status: isRunning ? "ABERTA" : "EM_ANDAMENTO",
    };

    try {
      const res = await fetch("/api/server/db/tasks/updateTask", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Erro ao alternar timer da tarefa", await res.text());
        return;
      }

      const data = await res.json();
      const updated = data?.task;

      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

      // 👇 Se essa tarefa é do usuário logado, força recarregar a sessão
      if (canControlTask(updated)) {
        const nowIsActive =
          String(updated.status || "").toLowerCase() === "em_andamento" &&
          updated.startedAt &&
          !updated.finishedAt;

        // 👉 Aqui você atualiza o que vai parar no token/session
        await update({
          hasActiveTask: nowIsActive,
          activeTask: nowIsActive
            ? {
                id: updated.id,
                title: updated.title,
                dueDate: updated.dueDate,
              }
            : null,
        });
      }
    } catch (err) {
      console.error("Erro ao alternar timer da tarefa", err);
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteTask = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      return;
    }
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Função para atualizar status ao mover tarefa no Kanban
  const handleKanbanMove = async (taskId, newStatus) => {
    setBusy(true);
    try {
      const res = await fetch("/api/server/db/tasks/updateTask", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: taskId,
          status: newStatus.toUpperCase(),
        }),
      });

      if (!res.ok) {
        console.error("Erro ao atualizar status", await res.text());
        return;
      }

      const data = await res.json();
      const updated = data?.task;

      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error("Erro ao mover tarefa", err);
    } finally {
      setBusy(false);
    }
  };

  // Agrupar tarefas por status para o Kanban
  const kanbanColumns = useMemo(() => {
    const columns = {
      aberta: [],
      em_andamento: [],
      em_teste: [],
      concluida: [],
      atrasada: [],
    };

    filteredSorted.forEach((task) => {
      const status = String(task.status || "").toLowerCase();
      if (columns[status]) {
        columns[status].push(task);
      }
    });

    return columns;
  }, [filteredSorted]);

  return (
    <div className={styles.page}>
      {/* Overlay de loading global */}
      {busy && (
        <div className={styles.loadingOverlay} role="status" aria-live="polite">
          <div className={styles.loadingCard}>
            <div
              className="spinner-border text-warning"
              role="status"
              aria-hidden="true"
            />
            <div className="mt-2 fw-semibold">Atualizando…</div>
            <div className="text-muted" style={{ fontSize: 12 }}>
              Só um instante.
            </div>
          </div>
        </div>
      )}

      <Seo title="Tarefas" />
      <Pageheader title="TAREFAS" heading="Tarefas" active="Tarefas" />

      <Row className="mb-3">
        <Col xs={12}>
          <Card className={styles.card}>
            <Card.Header className={styles.cardHeader}>
              <div className={styles.headerContainer}>
                {/* TOP: título + botão */}
                <div className={styles.headerTop}>
                  <div className={styles.headerTitleBlock}>
                    <h4 className="card-title mb-0">Painel de tarefas</h4>
                    {!loading && (
                      <div className={styles.subtleMeta}>
                        {totalTasks} tarefa(s) • {openTasks} aberta(s) •{" "}
                        {overdueTasks} atrasada(s)
                        {q && (
                          <>
                            {" "}
                            <span className="text-muted">|</span>{" "}
                            {filteredSorted.length} resultado(s) no filtro
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {!loading && (
                    <div className="d-flex gap-2 align-items-center">
                      <div className="btn-group" role="group">
                        <Button
                          size="sm"
                          variant={
                            viewMode === "table" ? "primary" : "outline-primary"
                          }
                          onClick={() => setViewMode("table")}
                          title="Visualização em tabela"
                        >
                          <FaList className="me-1" /> Tabela
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            viewMode === "kanban"
                              ? "primary"
                              : "outline-primary"
                          }
                          onClick={() => setViewMode("kanban")}
                          title="Visualização em Kanban"
                        >
                          <FaThLarge className="me-1" /> Trello
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="primary"
                        className={styles.newTaskButton}
                        onClick={openNewModal}
                      >
                        + Nova tarefa
                      </Button>
                    </div>
                  )}
                </div>

                <div className={styles.headerBottom}>
                  <div className={styles.filtersRow}>
                    <Form.Control
                      size="sm"
                      placeholder="Buscar por título, empresa ou responsável…"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className={styles.searchInput}
                    />

                    <Form.Select
                      size="sm"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className={styles.filterSelect}
                    >
                      <option value="all">Status: Todos</option>
                      <option value="aberta">Status: Aberta</option>
                      <option value="em_andamento">Status: Em andamento</option>
                      <option value="em_teste">Status: Em teste</option>
                      <option value="atrasada">Status: Atrasada</option>
                      <option value="concluida">Status: Concluída</option>
                    </Form.Select>

                    <Form.Select
                      size="sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={styles.filterSelect}
                    >
                      <option value="dueDate">Ordenar por: Prazo</option>
                      <option value="priority">Ordenar por: Prioridade</option>
                      <option value="createdAt">Ordenar por: Criação</option>
                    </Form.Select>

                    <Form.Select
                      size="sm"
                      value={userFilter}
                      onChange={(e) => setUserFilter(e.target.value)}
                      className={styles.filterSelect}
                    >
                      <option value="all">Responsável: Todos</option>

                      {assigneeFilterOptions.length === 0 && (
                        <option disabled>
                          — Nenhum responsável encontrado —
                        </option>
                      )}

                      {assigneeFilterOptions.map((u) => (
                        <option key={u.key} value={u.key}>
                          {u.name}
                          {u.email ? ` (${u.email})` : ""}
                        </option>
                      ))}
                    </Form.Select>

                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() =>
                        setSortDir((d) => (d === "asc" ? "desc" : "asc"))
                      }
                      className={styles.sortDirButton}
                      title={
                        sortDir === "asc"
                          ? "Direção: ascendente"
                          : "Direção: descendente"
                      }
                    >
                      {sortDir === "asc" ? "↑ Asc" : "↓ Desc"}
                    </Button>
                  </div>

                  {!loading && (
                    <div className={styles.pillGroup}>
                      <span className={styles.pill}>
                        <span className={styles.pillTitle}>
                          Tarefas abertas
                        </span>
                        <span className={styles.pillValue}>{openTasks}</span>
                      </span>
                      <span className={styles.pill}>
                        <span className={styles.pillTitle}>Atrasadas</span>
                        <span
                          className={`${styles.pillValue} ${styles.pillValueDanger}`}
                        >
                          {overdueTasks}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card.Header>

            <Card.Body className={styles.cardBody}>
              {loading ? (
                <div className="d-flex justify-content-center py-4">
                  <Spinner animation="border" role="status" />
                </div>
              ) : filteredSorted.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyEmoji}>✅</div>
                  <div className={styles.emptyTitle}>
                    Nenhuma tarefa encontrada
                  </div>
                  <div className={styles.emptyText}>
                    Ajuste a busca ou o filtro de status.
                  </div>
                </div>
              ) : viewMode === "kanban" ? (
                <div className={styles.kanbanBoard}>
                  {/* Coluna: Aberta */}
                  <div className={styles.kanbanColumn}>
                    <div className={styles.kanbanColumnHeader}>
                      <h5 className={styles.kanbanColumnTitle}>Aberta</h5>
                      <span className={styles.kanbanColumnCount}>
                        {kanbanColumns.aberta.length}
                      </span>
                    </div>
                    <div
                      className={styles.kanbanColumnContent}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add(styles.kanbanDragOver);
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove(styles.kanbanDragOver);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove(styles.kanbanDragOver);
                        const taskId = parseInt(
                          e.dataTransfer.getData("taskId")
                        );
                        if (taskId) {
                          handleKanbanMove(taskId, "aberta");
                        }
                      }}
                    >
                      {kanbanColumns.aberta.map((task) => (
                        <div
                          key={task.id}
                          className={styles.kanbanCard}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData(
                              "taskId",
                              task.id.toString()
                            );
                            e.currentTarget.classList.add(
                              styles.kanbanCardDragging
                            );
                          }}
                          onDragEnd={(e) => {
                            e.currentTarget.classList.remove(
                              styles.kanbanCardDragging
                            );
                          }}
                        >
                          <div className={styles.kanbanCardHeader}>
                            <h6
                              className={styles.kanbanCardTitle}
                              onClick={() => {
                                if (task.attachmentUrl) {
                                  window.open(task.attachmentUrl, "_blank");
                                }
                              }}
                              style={{
                                cursor: task.attachmentUrl
                                  ? "pointer"
                                  : "default",
                              }}
                            >
                              {task.title}
                              {task.attachmentUrl && (
                                <FiLink size={12} className="ms-1" />
                              )}
                            </h6>
                            <span
                              className={`${styles.badge} ${
                                task.priority === "alta"
                                  ? styles.badgePriorityHigh
                                  : task.priority === "media"
                                  ? styles.badgePriorityMedium
                                  : styles.badgePriorityLow
                              }`}
                            >
                              {priorityLabel(task.priority)}
                            </span>
                          </div>
                          <div className={styles.kanbanCardBody}>
                            {task.company &&
                              (typeof task.company === "object"
                                ? task.company.name
                                : task.company) && (
                                <div className={styles.kanbanCardMeta}>
                                  <strong>Empresa:</strong>{" "}
                                  {typeof task.company === "object"
                                    ? task.company.name
                                    : task.company}
                                </div>
                              )}
                            {task.responsibleName && (
                              <div className={styles.kanbanCardMeta}>
                                <strong>Responsável:</strong>{" "}
                                {task.responsibleName}
                              </div>
                            )}
                            {task.dueDate && (
                              <div className={styles.kanbanCardMeta}>
                                <strong>Prazo:</strong>{" "}
                                {formatDate(task.dueDate)}
                              </div>
                            )}
                          </div>
                          <div className={styles.kanbanCardActions}>
                            {canControlTask(task) && (
                              <button
                                onClick={() => handleToggleTaskTimer(task)}
                                className={styles.playPauseButton}
                                title="Iniciar/Pausar tarefa"
                              >
                                {String(task.status || "").toLowerCase() ===
                                  "em_andamento" &&
                                task.startedAt &&
                                !task.finishedAt ? (
                                  <FaPause size={12} />
                                ) : (
                                  <FaPlay size={12} />
                                )}
                              </button>
                            )}
                            <Button
                              size="sm"
                              variant="outline-light"
                              onClick={() => openEditModal(task)}
                            >
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coluna: Em andamento */}
                  <div className={styles.kanbanColumn}>
                    <div className={styles.kanbanColumnHeader}>
                      <h5 className={styles.kanbanColumnTitle}>Em andamento</h5>
                      <span className={styles.kanbanColumnCount}>
                        {kanbanColumns.em_andamento.length}
                      </span>
                    </div>
                    <div
                      className={styles.kanbanColumnContent}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add(styles.kanbanDragOver);
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove(styles.kanbanDragOver);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove(styles.kanbanDragOver);
                        const taskId = parseInt(
                          e.dataTransfer.getData("taskId")
                        );
                        if (taskId) {
                          handleKanbanMove(taskId, "em_andamento");
                        }
                      }}
                    >
                      {kanbanColumns.em_andamento.map((task) => (
                        <div
                          key={task.id}
                          className={styles.kanbanCard}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData(
                              "taskId",
                              task.id.toString()
                            );
                            e.currentTarget.classList.add(
                              styles.kanbanCardDragging
                            );
                          }}
                          onDragEnd={(e) => {
                            e.currentTarget.classList.remove(
                              styles.kanbanCardDragging
                            );
                          }}
                        >
                          <div className={styles.kanbanCardHeader}>
                            <h6
                              className={styles.kanbanCardTitle}
                              onClick={() => {
                                if (task.attachmentUrl) {
                                  window.open(task.attachmentUrl, "_blank");
                                }
                              }}
                              style={{
                                cursor: task.attachmentUrl
                                  ? "pointer"
                                  : "default",
                              }}
                            >
                              {task.title}
                              {task.attachmentUrl && (
                                <FiLink size={12} className="ms-1" />
                              )}
                            </h6>
                            <span
                              className={`${styles.badge} ${
                                task.priority === "alta"
                                  ? styles.badgePriorityHigh
                                  : task.priority === "media"
                                  ? styles.badgePriorityMedium
                                  : styles.badgePriorityLow
                              }`}
                            >
                              {priorityLabel(task.priority)}
                            </span>
                          </div>
                          <div className={styles.kanbanCardBody}>
                            {task.company &&
                              (typeof task.company === "object"
                                ? task.company.name
                                : task.company) && (
                                <div className={styles.kanbanCardMeta}>
                                  <strong>Empresa:</strong>{" "}
                                  {typeof task.company === "object"
                                    ? task.company.name
                                    : task.company}
                                </div>
                              )}
                            {task.responsibleName && (
                              <div className={styles.kanbanCardMeta}>
                                <strong>Responsável:</strong>{" "}
                                {task.responsibleName}
                              </div>
                            )}
                            {task.dueDate && (
                              <div className={styles.kanbanCardMeta}>
                                <strong>Prazo:</strong>{" "}
                                {formatDate(task.dueDate)}
                              </div>
                            )}
                          </div>
                          <div className={styles.kanbanCardActions}>
                            {canControlTask(task) && (
                              <button
                                onClick={() => handleToggleTaskTimer(task)}
                                className={styles.playPauseButton}
                                title="Iniciar/Pausar tarefa"
                              >
                                {String(task.status || "").toLowerCase() ===
                                  "em_andamento" &&
                                task.startedAt &&
                                !task.finishedAt ? (
                                  <FaPause size={12} />
                                ) : (
                                  <FaPlay size={12} />
                                )}
                              </button>
                            )}
                            <Button
                              size="sm"
                              variant="outline-light"
                              onClick={() => openEditModal(task)}
                            >
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coluna: Em teste */}
                  <div className={styles.kanbanColumn}>
                    <div className={styles.kanbanColumnHeader}>
                      <h5 className={styles.kanbanColumnTitle}>Em teste</h5>
                      <span className={styles.kanbanColumnCount}>
                        {kanbanColumns.em_teste.length}
                      </span>
                    </div>
                    <div
                      className={styles.kanbanColumnContent}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add(styles.kanbanDragOver);
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove(styles.kanbanDragOver);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove(styles.kanbanDragOver);
                        const taskId = parseInt(
                          e.dataTransfer.getData("taskId")
                        );
                        if (taskId) {
                          handleKanbanMove(taskId, "em_teste");
                        }
                      }}
                    >
                      {kanbanColumns.em_teste.map((task) => (
                        <div
                          key={task.id}
                          className={styles.kanbanCard}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData(
                              "taskId",
                              task.id.toString()
                            );
                            e.currentTarget.classList.add(
                              styles.kanbanCardDragging
                            );
                          }}
                          onDragEnd={(e) => {
                            e.currentTarget.classList.remove(
                              styles.kanbanCardDragging
                            );
                          }}
                        >
                          <div className={styles.kanbanCardHeader}>
                            <h6
                              className={styles.kanbanCardTitle}
                              onClick={() => {
                                if (task.attachmentUrl) {
                                  window.open(task.attachmentUrl, "_blank");
                                }
                              }}
                              style={{
                                cursor: task.attachmentUrl
                                  ? "pointer"
                                  : "default",
                              }}
                            >
                              {task.title}
                              {task.attachmentUrl && (
                                <FiLink size={12} className="ms-1" />
                              )}
                            </h6>
                            <span
                              className={`${styles.badge} ${
                                task.priority === "alta"
                                  ? styles.badgePriorityHigh
                                  : task.priority === "media"
                                  ? styles.badgePriorityMedium
                                  : styles.badgePriorityLow
                              }`}
                            >
                              {priorityLabel(task.priority)}
                            </span>
                          </div>
                          <div className={styles.kanbanCardBody}>
                            {task.company &&
                              (typeof task.company === "object"
                                ? task.company.name
                                : task.company) && (
                                <div className={styles.kanbanCardMeta}>
                                  <strong>Empresa:</strong>{" "}
                                  {typeof task.company === "object"
                                    ? task.company.name
                                    : task.company}
                                </div>
                              )}
                            {task.responsibleName && (
                              <div className={styles.kanbanCardMeta}>
                                <strong>Responsável:</strong>{" "}
                                {task.responsibleName}
                              </div>
                            )}
                            {task.dueDate && (
                              <div className={styles.kanbanCardMeta}>
                                <strong>Prazo:</strong>{" "}
                                {formatDate(task.dueDate)}
                              </div>
                            )}
                          </div>
                          <div className={styles.kanbanCardActions}>
                            {canControlTask(task) && (
                              <button
                                onClick={() => handleToggleTaskTimer(task)}
                                className={styles.playPauseButton}
                                title="Iniciar/Pausar tarefa"
                              >
                                {String(task.status || "").toLowerCase() ===
                                  "em_andamento" &&
                                task.startedAt &&
                                !task.finishedAt ? (
                                  <FaPause size={12} />
                                ) : (
                                  <FaPlay size={12} />
                                )}
                              </button>
                            )}
                            <Button
                              size="sm"
                              variant="outline-light"
                              onClick={() => openEditModal(task)}
                            >
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coluna: Concluída */}
                  <div className={styles.kanbanColumn}>
                    <div className={styles.kanbanColumnHeader}>
                      <h5 className={styles.kanbanColumnTitle}>Concluída</h5>
                      <span className={styles.kanbanColumnCount}>
                        {kanbanColumns.concluida.length}
                      </span>
                    </div>
                    <div
                      className={styles.kanbanColumnContent}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add(styles.kanbanDragOver);
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove(styles.kanbanDragOver);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove(styles.kanbanDragOver);
                        const taskId = parseInt(
                          e.dataTransfer.getData("taskId")
                        );
                        if (taskId) {
                          handleKanbanMove(taskId, "concluida");
                        }
                      }}
                    >
                      {kanbanColumns.concluida.map((task) => (
                        <div
                          key={task.id}
                          className={styles.kanbanCard}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData(
                              "taskId",
                              task.id.toString()
                            );
                            e.currentTarget.classList.add(
                              styles.kanbanCardDragging
                            );
                          }}
                          onDragEnd={(e) => {
                            e.currentTarget.classList.remove(
                              styles.kanbanCardDragging
                            );
                          }}
                        >
                          <div className={styles.kanbanCardHeader}>
                            <h6
                              className={styles.kanbanCardTitle}
                              onClick={() => {
                                if (task.attachmentUrl) {
                                  window.open(task.attachmentUrl, "_blank");
                                }
                              }}
                              style={{
                                cursor: task.attachmentUrl
                                  ? "pointer"
                                  : "default",
                              }}
                            >
                              {task.title}
                              {task.attachmentUrl && (
                                <FiLink size={12} className="ms-1" />
                              )}
                            </h6>
                            <span
                              className={`${styles.badge} ${
                                task.priority === "alta"
                                  ? styles.badgePriorityHigh
                                  : task.priority === "media"
                                  ? styles.badgePriorityMedium
                                  : styles.badgePriorityLow
                              }`}
                            >
                              {priorityLabel(task.priority)}
                            </span>
                          </div>
                          <div className={styles.kanbanCardBody}>
                            {task.company &&
                              (typeof task.company === "object"
                                ? task.company.name
                                : task.company) && (
                                <div className={styles.kanbanCardMeta}>
                                  <strong>Empresa:</strong>{" "}
                                  {typeof task.company === "object"
                                    ? task.company.name
                                    : task.company}
                                </div>
                              )}
                            {task.responsibleName && (
                              <div className={styles.kanbanCardMeta}>
                                <strong>Responsável:</strong>{" "}
                                {task.responsibleName}
                              </div>
                            )}
                            {task.dueDate && (
                              <div className={styles.kanbanCardMeta}>
                                <strong>Prazo:</strong>{" "}
                                {formatDate(task.dueDate)}
                              </div>
                            )}
                          </div>
                          <div className={styles.kanbanCardActions}>
                            {canControlTask(task) && (
                              <button
                                onClick={() => handleToggleTaskTimer(task)}
                                className={styles.playPauseButton}
                                title="Iniciar/Pausar tarefa"
                              >
                                {String(task.status || "").toLowerCase() ===
                                  "em_andamento" &&
                                task.startedAt &&
                                !task.finishedAt ? (
                                  <FaPause size={12} />
                                ) : (
                                  <FaPlay size={12} />
                                )}
                              </button>
                            )}
                            <Button
                              size="sm"
                              variant="outline-light"
                              onClick={() => openEditModal(task)}
                            >
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coluna: Atrasada */}
                  <div className={styles.kanbanColumn}>
                    <div className={styles.kanbanColumnHeader}>
                      <h5 className={styles.kanbanColumnTitle}>Atrasada</h5>
                      <span className={styles.kanbanColumnCount}>
                        {kanbanColumns.atrasada.length}
                      </span>
                    </div>
                    <div
                      className={styles.kanbanColumnContent}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add(styles.kanbanDragOver);
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove(styles.kanbanDragOver);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove(styles.kanbanDragOver);
                        const taskId = parseInt(
                          e.dataTransfer.getData("taskId")
                        );
                        if (taskId) {
                          handleKanbanMove(taskId, "atrasada");
                        }
                      }}
                    >
                      {kanbanColumns.atrasada.map((task) => (
                        <div
                          key={task.id}
                          className={styles.kanbanCard}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData(
                              "taskId",
                              task.id.toString()
                            );
                            e.currentTarget.classList.add(
                              styles.kanbanCardDragging
                            );
                          }}
                          onDragEnd={(e) => {
                            e.currentTarget.classList.remove(
                              styles.kanbanCardDragging
                            );
                          }}
                        >
                          <div className={styles.kanbanCardHeader}>
                            <h6
                              className={styles.kanbanCardTitle}
                              onClick={() => {
                                if (task.attachmentUrl) {
                                  window.open(task.attachmentUrl, "_blank");
                                }
                              }}
                              style={{
                                cursor: task.attachmentUrl
                                  ? "pointer"
                                  : "default",
                              }}
                            >
                              {task.title}
                              {task.attachmentUrl && (
                                <FiLink size={12} className="ms-1" />
                              )}
                            </h6>
                            <span
                              className={`${styles.badge} ${
                                task.priority === "alta"
                                  ? styles.badgePriorityHigh
                                  : task.priority === "media"
                                  ? styles.badgePriorityMedium
                                  : styles.badgePriorityLow
                              }`}
                            >
                              {priorityLabel(task.priority)}
                            </span>
                          </div>
                          <div className={styles.kanbanCardBody}>
                            {task.company &&
                              (typeof task.company === "object"
                                ? task.company.name
                                : task.company) && (
                                <div className={styles.kanbanCardMeta}>
                                  <strong>Empresa:</strong>{" "}
                                  {typeof task.company === "object"
                                    ? task.company.name
                                    : task.company}
                                </div>
                              )}
                            {task.responsibleName && (
                              <div className={styles.kanbanCardMeta}>
                                <strong>Responsável:</strong>{" "}
                                {task.responsibleName}
                              </div>
                            )}
                            {task.dueDate && (
                              <div className={styles.kanbanCardMeta}>
                                <strong>Prazo:</strong>{" "}
                                {formatDate(task.dueDate)}
                              </div>
                            )}
                          </div>
                          <div className={styles.kanbanCardActions}>
                            {canControlTask(task) && (
                              <button
                                onClick={() => handleToggleTaskTimer(task)}
                                className={styles.playPauseButton}
                                title="Iniciar/Pausar tarefa"
                              >
                                {String(task.status || "").toLowerCase() ===
                                  "em_andamento" &&
                                task.startedAt &&
                                !task.finishedAt ? (
                                  <FaPause size={12} />
                                ) : (
                                  <FaPlay size={12} />
                                )}
                              </button>
                            )}
                            <Button
                              size="sm"
                              variant="outline-light"
                              onClick={() => openEditModal(task)}
                            >
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.tableWrap}>
                    <Table hover responsive className={styles.table}>
                      <thead>
                        <tr>
                          <th className={styles.stickyTh}>Tarefa</th>
                          <th
                            className={`${styles.stickyTh} d-none d-md-table-cell`}
                          >
                            Empresa
                          </th>
                          <th
                            className={`${styles.stickyTh} d-none d-lg-table-cell`}
                          >
                            Responsável
                          </th>
                          <th className={`${styles.stickyTh} text-center`}>
                            Prioridade
                          </th>
                          <th className={`${styles.stickyTh} text-center`}>
                            Status
                          </th>
                          <th className={`${styles.stickyTh} text-end`}>
                            Prazo
                          </th>
                          <th className={`${styles.stickyTh} text-end`}>
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedTasks.map((t) => {
                          const priority = String(
                            t.priority || ""
                          ).toLowerCase();
                          const status = String(t.status || "").toLowerCase();
                          const isRunning =
                            status === "em_andamento" &&
                            t.startedAt &&
                            !t.finishedAt;
                          const hasBriefing = !!t.attachmentUrl;
                          const isOwner = canControlTask(t);

                          const companyName =
                            t.company && typeof t.company === "object"
                              ? t.company.name || ""
                              : t.company || "";

                          return (
                            <tr key={t.id}>
                              <td>
                                <div className="d-flex flex-column">
                                  <span
                                    className={`fw-semibold d-inline-flex align-items-center gap-1 ${
                                      hasBriefing ? styles.taskTitleLink : ""
                                    }`}
                                    onClick={() => {
                                      if (hasBriefing) {
                                        window.open(t.attachmentUrl, "_blank");
                                      }
                                    }}
                                    role={hasBriefing ? "button" : undefined}
                                  >
                                    {t.title}
                                    {hasBriefing && <FiLink size={14} />}
                                  </span>
                                  <span className="text-muted small d-md-none">
                                    {companyName}
                                  </span>
                                  <span className="text-muted small d-lg-none">
                                    {t.responsibleName}
                                  </span>
                                </div>
                              </td>
                              <td className="d-none d-md-table-cell">
                                {companyName}
                              </td>
                              <td className="d-none d-lg-table-cell">
                                <div className="d-flex flex-column">
                                  <span>{t.responsibleName}</span>
                                  <span className="text-muted small">
                                    {t.responsibleEmail}
                                  </span>
                                </div>
                              </td>
                              <td className="text-center">
                                <span
                                  className={`${styles.badge} ${
                                    priority === "alta"
                                      ? styles.badgePriorityHigh
                                      : priority === "media"
                                      ? styles.badgePriorityMedium
                                      : styles.badgePriorityLow
                                  }`}
                                >
                                  {priorityLabel(priority)}
                                </span>
                              </td>
                              <td className="text-center">
                                <span
                                  className={`${styles.badge} ${
                                    status === "concluida"
                                      ? styles.badgeStatusDone
                                      : status === "atrasada"
                                      ? styles.badgeStatusLate
                                      : styles.badgeStatusOpen
                                  }`}
                                >
                                  {statusLabel(status)}
                                </span>
                              </td>
                              <td className="text-end">
                                {formatDate(t.dueDate)}
                              </td>
                              <td className="text-end">
                                <div className="d-flex justify-content-end gap-2">
                                  {isOwner && (
                                    <button
                                      onClick={() => handleToggleTaskTimer(t)}
                                      className={styles.playPauseButton}
                                    >
                                      {isRunning ? (
                                        <FaPause size={14} />
                                      ) : (
                                        <FaPlay size={14} />
                                      )}
                                    </button>
                                  )}

                                  <Button
                                    size="sm"
                                    variant="outline-light"
                                    onClick={() => openEditModal(t)}
                                  >
                                    Editar
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline-danger"
                                    onClick={() => handleDeleteTask(t.id)}
                                  >
                                    Excluir
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>

                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mt-3 gap-2">
                    <small className="text-muted">
                      Exibindo {startIndex + 1}–
                      {Math.min(endIndex, totalFiltered)} de {totalFiltered}{" "}
                      tarefa(s) filtrada(s)
                    </small>

                    {totalPages > 1 && (
                      <Pagination className="mb-0">
                        <Pagination.First
                          disabled={currentPageSafe === 1}
                          onClick={() => setCurrentPage(1)}
                        />
                        <Pagination.Prev
                          disabled={currentPageSafe === 1}
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                        />
                        {Array.from(
                          {
                            length: totalPages,
                          },
                          (_, i) => i + 1
                        ).map((page) => (
                          <Pagination.Item
                            key={page}
                            active={page === currentPageSafe}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          disabled={currentPageSafe === totalPages}
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                        />
                        <Pagination.Last
                          disabled={currentPageSafe === totalPages}
                          onClick={() => setCurrentPage(totalPages)}
                        />
                      </Pagination>
                    )}
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal de cadastro/edição */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingTask ? "Editar tarefa" : "Nova tarefa"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveTask();
            }}
          >
            <Form.Group className="mb-3" controlId="taskTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={form.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                required
              />
            </Form.Group>

            {/* EMPRESA COM AUTOCOMPLETE */}
            <Form.Group className="mb-3" controlId="taskCompany">
              <Form.Label>Empresa</Form.Label>

              <div className={styles.autocompleteWrapper}>
                <Form.Control
                  type="text"
                  value={form.company}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleFormChange("company", value);
                    handleFormChange("companyId", null);
                    searchCompanies(value);
                  }}
                  placeholder="Digite para buscar..."
                  autoComplete="off"
                />

                {companyResults.length > 0 && (
                  <div className={styles.autocompleteBox}>
                    {companyResults.map((c) => (
                      <div
                        key={c.id}
                        className={styles.autocompleteItem}
                        onClick={() => {
                          handleFormChange("company", c.name);
                          handleFormChange("companyId", c.id);
                          setCompanyResults([]);
                        }}
                      >
                        <strong>{c.name}</strong>
                        {c.email && (
                          <div className={styles.autocompleteEmail}>
                            {c.email}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                {/* RESPONSÁVEL COM AUTOCOMPLETE DE USER */}
                <Form.Group controlId="taskResponsibleName">
                  <Form.Label>Responsável</Form.Label>
                  <div className={styles.autocompleteWrapper}>
                    <Form.Control
                      type="text"
                      value={form.responsibleName}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleFormChange("responsibleName", value);
                        handleFormChange("assigneeId", null);
                        searchUsers(value);
                      }}
                      placeholder="Digite para buscar usuário..."
                      autoComplete="off"
                    />

                    {assigneeResults.length > 0 && (
                      <div className={styles.autocompleteBox}>
                        {assigneeResults.map((u) => (
                          <div
                            key={u.id}
                            className={styles.autocompleteItem}
                            onClick={() => {
                              handleFormChange("responsibleName", u.name || "");
                              handleFormChange(
                                "responsibleEmail",
                                u.email || ""
                              );
                              handleFormChange("assigneeId", u.id);
                              setAssigneeResults([]);
                            }}
                          >
                            <strong>{u.name || "(sem nome)"}</strong>
                            <div className={styles.autocompleteEmail}>
                              {u.email}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="taskResponsibleEmail">
                  <Form.Label>E-mail do responsável</Form.Label>
                  <Form.Control
                    type="email"
                    value={form.responsibleEmail}
                    readOnly
                    placeholder="Selecione um usuário"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="taskPriority">
                  <Form.Label>Prioridade</Form.Label>
                  <Form.Select
                    value={form.priority}
                    onChange={(e) =>
                      handleFormChange("priority", e.target.value)
                    }
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="taskStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={form.status}
                    onChange={(e) => handleFormChange("status", e.target.value)}
                  >
                    <option value="aberta">Aberta</option>
                    <option value="em_andamento">Em andamento</option>
                    <option value="em_teste">Em teste</option>
                    <option value="atrasada">Atrasada</option>
                    <option value="concluida">Concluída</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="taskDueDate">
                  <Form.Label>Prazo</Form.Label>
                  <Form.Control
                    type="date"
                    value={form.dueDate}
                    onChange={(e) =>
                      handleFormChange("dueDate", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="taskAttachment">
              <Form.Label>Breafing da tarefa (PDF / Word)</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleAttachmentChange}
                disabled={uploadingAttachment || saving}
              />
              {uploadingAttachment && (
                <div className="mt-2 d-flex align-items-center gap-2">
                  <Spinner animation="border" size="sm" />
                  <span>Enviando arquivo...</span>
                </div>
              )}

              {form.attachmentUrl && (
                <div className="mt-2">
                  <a
                    href={form.attachmentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-warning"
                  >
                    {form.attachmentFilename || "Ver documento atual"}
                  </a>
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            disabled={saving}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveTask} disabled={saving}>
            {saving ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  className="me-2"
                />
                Salvando...
              </>
            ) : (
              "Salvar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

TarefasPage.layout = "Contentlayout";

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res);
  if (!session) return { redirect: { destination: "/", permanent: false } };
  console.log(session, "session");
  return { props: {} };
};
