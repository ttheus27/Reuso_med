import axios from "axios";
import { getServerSession } from "next-auth";
import Papa from "papaparse";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Modal,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { BasicTable } from "../../../shared/data/dashboards/dashboards1data";
import Pageheader from "../../../shared/layout-components/pageheader/pageheader";
import Seo from "../../../shared/layout-components/seo/seo";
import { getTotalApprovedPayments } from "../../api/server/db/finance/getAllPayments";
import { getRecentPayments } from "../../api/server/db/finance/getRecentPayments";
import { getTotalPaymentsCount } from "../../api/server/db/finance/getTotalPaymentsCount";
import styles from "./styles.module.scss";
const Finance = ({ recentOrders, totalSales, totalPayments }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState("7days");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Estado para o modal de criar pedido manual
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [manualOrderForm, setManualOrderForm] = useState({
    amount: "",
    paymentMethod: "PIX",
    status: "PENDING",
    paymentType: "VENDA",
  });
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // Carregar empresas quando o modal abrir
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const response = await axios.get("/api/company/list");
        setCompanies(response.data);
      } catch (error) {
        console.error("Erro ao carregar empresas:", error);
        setCompanies([]);
      }
    };

    if (showCreateModal) {
      loadCompanies();
    }
  }, [showCreateModal]);

  // Handle para selecionar uma empresa do dropdown
  const handleSelectCompany = (companyId) => {
    if (companyId === "") {
      setSelectedCompany(null);
      return;
    }

    const company = companies.find((c) => c.id === parseInt(companyId));
    setSelectedCompany(company);
  };

  // Handle para atualizar o form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setManualOrderForm({
      ...manualOrderForm,
      [name]: value,
    });
  };

  // Handle para criar o pedido
  const handleCreateOrder = async () => {
    if (!selectedCompany) {
      toast.error("Selecione uma empresa");
      return;
    }

    const parsedAmount = parseFloat(manualOrderForm.amount);
    if (!manualOrderForm.amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Insira um valor válido maior que zero");
      return;
    }

    if (parsedAmount > 20000000) {
      toast.error("O valor máximo permitido por transação é R$ 20.000.000,00");
      return;
    }

    setIsCreatingOrder(true);

    try {
      const response = await axios.post("/api/orders/create-manual/", {
        companyId: selectedCompany.id,
        amount: parsedAmount,
        paymentMethod: manualOrderForm.paymentMethod,
        status: manualOrderForm.status,
        paymentType: manualOrderForm.paymentType,
      });

      const message = "Pagamento criado com sucesso!";
      toast.success(message);

      // Resetar o form
      setSelectedCompany(null);
      setManualOrderForm({
        amount: "",
        paymentMethod: "PIX",
        status: "PENDING",
        paymentType: "VENDA",
      });
      setShowCreateModal(false);

      // Recarregar a página para mostrar o novo pedido
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      const serverMessage =
        error?.response?.data?.error ||
        error?.response?.data?.details ||
        "Erro ao criar pedido. Tente novamente.";
      toast.error(serverMessage);
    } finally {
      setIsCreatingOrder(false);
    }
  };
  const getFilteredOrders = () => {
    const today = new Date();
    const filterDate = new Date();

    switch (dateFilter) {
      case "today": {
        const start = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0,
          0
        );
        const end = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59,
          999
        );

        return recentOrders.filter((order) => {
          const orderDate = new Date(order.date);
          return orderDate >= start && orderDate <= end;
        });
      }

      case "7days":
        filterDate.setDate(today.getDate() - 7);
        break;
      case "15days":
        filterDate.setDate(today.getDate() - 15);
        break;
      case "30days":
        filterDate.setDate(today.getDate() - 30);
        break;
      case "custom":
        return recentOrders.filter((order) => {
          const orderDate = new Date(order.date);
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;

          if (start && end) {
            return orderDate >= start && orderDate <= end;
          }
          return true;
        });
      default:
        filterDate.setDate(today.getDate() - 7);
    }

    return recentOrders.filter((order) => new Date(order.date) >= filterDate);
  };

  const filteredStats = useMemo(() => {
    const filtered = getFilteredOrders();
    const paidOrders = filtered.filter((order) => order.status === "PAID");
    const totalFaturado = paidOrders.reduce(
      (sum, order) => sum + order.amount,
      0
    );
    const totalPagamentos = paidOrders.length;
    return {
      totalFaturado,
      totalPagamentos,
    };
  }, [dateFilter, startDate, endDate, recentOrders]);

  const handleDateFilterChange = async (filter) => {
    setIsLoading(true);
    setDateFilter(filter);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const exportOrdersToCSV = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("/api/orders");

      const ordersData = response.data;

      const csvData = ordersData.map((order) => ({
        Nome: order.name,
        Data: new Date(order.date).toLocaleDateString("pt-BR"),
        Status:
          order.status === "PAID"
            ? "Pago"
            : order.status === "PENDING"
            ? "Pendente"
            : "Falhou",
        Valor: formatAmount(order.amount),
      }));

      const csv = Papa.unparse(csvData, { header: true });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.setAttribute("download", "Relatório completo.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = recentOrders?.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.name.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower) ||
      order.amount.toString().includes(searchLower) ||
      (order.email && order.email.toLowerCase().includes(searchLower)) ||
      new Date(order.date).toLocaleDateString("pt-BR").includes(searchLower)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
        <span className="ms-2">Processando dados...</span>
      </div>
    );
  }

  return (
    <Fragment>
      <Seo title={"Financeiro"} />

      <Pageheader title="FINANCEIRO" heading="Financeiro" active="Financeiro" />
      <Row>
        <Col xxl={9} xl={12} lg={12} md={12} sm={12}>
          <Col xl={8} lg={8} md={8} sm={8} className="px-0">
            <div className="mb-3 d-flex align-items-center gap-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary">
                  {dateFilter === "today" && "Hoje"}
                  {dateFilter === "7days" && "Últimos 7 dias"}
                  {dateFilter === "15days" && "Últimos 15 dias"}
                  {dateFilter === "30days" && "Últimos 30 dias"}
                  {dateFilter === "custom" && "Data Personalizada"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleDateFilterChange("today")}
                  >
                    Hoje
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDateFilterChange("7days")}
                  >
                    Últimos 7 dias
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDateFilterChange("15days")}
                  >
                    Últimos 15 dias
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDateFilterChange("30days")}
                  >
                    Últimos 30 dias
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDateFilterChange("custom")}
                  >
                    Data Personalizada
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {dateFilter === "custom" && (
                <div className="d-flex align-items-center gap-2">
                  <span>De:</span>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Data inicial"
                  />
                  <span>Até:</span>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="Data final"
                  />
                </div>
              )}
            </div>

            <Card className=" px-3 ps-4">
              <Row className="index1">
                <Col xl={6} lg={6} md={6} sm={6} xxl={6}>
                  <Row className="border-end bd-xs-e-0 p-3">
                    <div className="col-2 d-flex align-items-center justify-content-center">
                      <div className="circle-icon bg-primary text-center align-self-center overflow-hidden shadow">
                        <i className="fe fe-shopping-bag tx-15 text-white"></i>
                      </div>
                    </div>
                    <div className="col-10 py-0">
                      <div className="pt-4 pb-3">
                        <div className="d-flex">
                          <h6 className="mb-2 fs-12 d-block">
                            Total de Pagamentos
                          </h6>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <h4 className="fs-18 fw-semibold mb-0">
                              {filteredStats.totalPagamentos}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Col>

                {/* Total Faturado */}
                <Col xl={6} lg={6} md={6} sm={6} xxl={6}>
                  <Row className="p-3">
                    <div className="col-2 d-flex align-items-center justify-content-center">
                      <div className="circle-icon bg-info text-center align-self-center overflow-hidden shadow">
                        <i className="fe fe-credit-card tx-15 text-white"></i>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="pt-4 pb-3">
                        <div className="d-flex">
                          <h6 className="mb-2 fs-12 d-block">Total Faturado</h6>
                        </div>
                        <div className="pb-0 mt-0">
                          <div className="d-flex">
                            <h4 className="tx-18 font-weight-semibold mb-0">
                              {formatAmount(filteredStats.totalFaturado)}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Col>
        <Col xs={12} lg={12} md={12} xl={12} xxl={3}>
          <div className={styles.buttonContainer}>
            <Button
              variant=""
              type="button"
              className="btn btn-primary mb-2"
              onClick={exportOrdersToCSV}
            >
              <i className="fe fe-download me-1"></i> Extrair Relatório
            </Button>
            <Button
              variant=""
              type="button"
              className="btn btn-success"
              onClick={() => setShowCreateModal(true)}
            >
              <i className="fe fe-plus me-1"></i> Novo Pagamento Manual
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} className="col-12">
          <Card>
            <Card.Header
              style={{
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <h4 className="card-title">Todos os pedidos</h4>
              <div className="mt-1" style={{ width: "30%" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nome, email, status ou data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Card.Header>
            <Card.Body className="pt-0 example1-table">
              <div className="table-responsive">
                <BasicTable recentOrders={currentItems} />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="d-flex align-items-center">
                  <span className="me-2">Itens por página:</span>
                  <Form.Select
                    style={{ width: "80px" }}
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </Form.Select>
                  <span className="ms-3">
                    Mostrando {indexOfFirstItem + 1} a{" "}
                    {Math.min(indexOfLastItem, filteredOrders.length)} de{" "}
                    {filteredOrders.length} registros
                  </span>
                </div>
                <Pagination>
                  <Pagination.Prev
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  />
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = index + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + index;
                    } else {
                      pageNumber = currentPage - 2 + index;
                    }

                    if (pageNumber > 0 && pageNumber <= totalPages) {
                      return (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === currentPage}
                          onClick={() => paginate(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      );
                    }
                    return null;
                  })}
                  <Pagination.Next
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para criar pedido manual */}
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Criar Pagamento Manual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Selecionar Empresa</Form.Label>
              <Form.Select
                value={selectedCompany?.id || ""}
                onChange={(e) => handleSelectCompany(e.target.value)}
              >
                <option value="">Selecione uma empresa...</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}{" "}
                    {company.responsible && `- ${company.responsible}`}
                  </option>
                ))}
              </Form.Select>

              {/* Detalhes da empresa selecionada */}
              {selectedCompany && (
                <div className="mt-3 p-3 border rounded bg-light">
                  <h5 className="mb-2">Empresa Selecionada</h5>
                  <p className="mb-1">
                    <strong>Nome:</strong> {selectedCompany.name}
                  </p>
                  {selectedCompany.email && (
                    <p className="mb-1">
                      <strong>Email:</strong> {selectedCompany.email}
                    </p>
                  )}
                  {selectedCompany.responsible && (
                    <p className="mb-1">
                      <strong>Responsável:</strong>{" "}
                      {selectedCompany.responsible}
                    </p>
                  )}
                  {selectedCompany.cnpj && (
                    <p className="mb-0">
                      <strong>CNPJ:</strong> {selectedCompany.cnpj}
                    </p>
                  )}
                </div>
              )}
            </Form.Group>

            <hr />

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Valor (R$)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0.01"
                    name="amount"
                    value={manualOrderForm.amount}
                    onChange={handleFormChange}
                    placeholder="0,00"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Método de Pagamento</Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={manualOrderForm.paymentMethod}
                    onChange={handleFormChange}
                  >
                    <option value="PIX">PIX</option>
                    <option value="CARTAO">Cartão de Crédito</option>
                    <option value="BOLETO">Boleto</option>
                    <option value="DINHEIRO">Dinheiro</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={manualOrderForm.status}
                    onChange={handleFormChange}
                  >
                    <option value="PENDING">Pendente</option>
                    <option value="PAID">Pago</option>
                    <option value="FAILED">Falhou</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Pagamento</Form.Label>
                  <Form.Select
                    name="paymentType"
                    value={manualOrderForm.paymentType}
                    onChange={handleFormChange}
                  >
                    <option value="VENDA">Venda</option>
                    <option value="MENSALIDADE">Mensalidade</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateOrder}
            disabled={
              isCreatingOrder || !selectedCompany || !manualOrderForm.amount
            }
          >
            {isCreatingOrder ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-1"
                />
                Criando...
              </>
            ) : (
              "Criar Pagamento"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

Finance.layout = "Contentlayout";

export default Finance;

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const safeSession = {
    ...session,
    user: {
      ...session.user,
      image: session.user?.image || null,
    },
  };

  const totalSales = await getTotalApprovedPayments();

  const recentOrders = await getRecentPayments();

  const totalPayments = await getTotalPaymentsCount();

  return {
    props: {
      session: safeSession,
      totalSales,
      recentOrders,
      totalPayments,
    },
  };
};
