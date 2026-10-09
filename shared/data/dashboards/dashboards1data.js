import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import localeData from "dayjs/plugin/localeData";
import dynamic from "next/dynamic";
import { Modal, Button, Spinner } from "react-bootstrap";
import React, { Fragment, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
dayjs.extend(localeData);
dayjs.locale("pt-br");

const handleSpedyIntegration = async (userIdOrEmail, transactionId, amount) => {
  try {
    console.log("Iniciando integração Spedy:", {
      userIdOrEmail,
      transactionId,
      amount,
    });

    // Determina se é userId (número) ou email (string)
    const isUserId = typeof userIdOrEmail === "number";
    const payload = isUserId
      ? { userId: userIdOrEmail }
      : { email: userIdOrEmail };

    console.log("Payload para check-or-create:", payload);

    // 1. Verifica ou cria cliente Spedy
    const spedyResponse = await fetch("/api/spedy/check-or-create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    await spedyResponse.json();

    // 2. Cria pedido na Spedy
    const orderPayload = isUserId
      ? { userId: userIdOrEmail, transactionId, amount }
      : { email: userIdOrEmail, transactionId, amount };

    await fetch("/api/spedy/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...orderPayload,
        items: [
          {
            description: "Adição de saldo",
            quantity: 1,
            price: amount,
            amount: amount,
            product: {
              name: "Crédito na plataforma",
              code: "CRED001",
              price: amount,
              profile: "producer",
              invoiceModel: "productInvoice",
            },
          },
        ],
      }),
    });
  } catch (error) {
    console.error("Erro ao integrar com o Spedy:", error);
  }
};

export class Statistics1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props.chartData?.series || [
        {
          name: "Total de Pedidos",
          data: [44, 42, 57, 86, 58, 55, 70, 43, 23, 54, 77, 34],
        },
        {
          name: "Total Faturado",
          data: [34, 22, 37, 56, 21, 35, 60, 34, 56, 78, 89, 53],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 280,
        },
        grid: {
          borderColor: "#f2f6f7",
          show: true,
        },
        colors: ["var(--primary-color)", "#ffbd5a"],
        plotOptions: {
          bar: {
            borderRadius: 5,
            colors: {
              ranges: [
                {
                  from: -100,
                  to: -46,
                  color: "#ebeff5",
                },
                {
                  from: -45,
                  to: 0,
                  color: "#ebeff5",
                },
              ],
            },
            columnWidth: "40%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 4,
          colors: ["transparent"],
        },
        legend: {
          show: true,
          position: "top",
        },
        xaxis: {
          type: "month",
          categories: props.chartData?.categories || [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          axisBorder: {
            show: true,
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
            width: 6,
            offsetX: 0,
            offsetY: 0,
          },
          labels: {
            rotate: -90,
          },
        },
        yaxis: {
          title: {
            text: "",
            style: {
              color: "#adb5be",
              fontSize: "14px",
              fontFamily: "poppins, sans-serif",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-label",
            },
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0) + "";
            },
          },
        },
        fill: {
          opacity: 1,
        },
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chartData !== this.props.chartData) {
      this.setState({
        series: this.props.chartData?.series || this.state.series,
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories:
              this.props.chartData?.categories ||
              this.state.options.xaxis.categories,
          },
        },
      });
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={280}
        />
      </div>
    );
  }
}

export class Viewers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Celular",
          data: this.props.accessData.mobile,
        },
        {
          name: "Computador",
          data: this.props.accessData.desktop,
        },
      ],
      options: {
        chart: {
          height: 315,
          type: "line",
          toolbar: {
            show: false,
          },
          background: "none",
          fill: "#fff",
        },
        grid: {
          borderColor: "#f2f6f7",
        },
        colors: ["var(--primary-color)", "#ffbd5a"],
        background: "transparent",
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        legend: {
          show: true,
          position: "top",
        },
        xaxis: {
          categories: this.props.accessData.dates,
          axisBorder: {
            show: false,
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: false,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
            width: 6,
            offsetX: 0,
            offsetY: 0,
          },
          labels: {
            rotate: -90,
          },
        },
        yaxis: {
          show: true,
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={310}
        />
      </div>
    );
  }
}

export const Radialbar = {
  series: [85],
  options: {
    states: {
      normal: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        hollow: {
          margin: 20,
          size: "50%",
          background: "#fff",
          stroke: {
            width: 5,
          },
        },
        dataLabels: {
          name: {
            show: false,
            fontSize: "16px",
            color: undefined,
            offsetY: 5,
          },
          value: {
            show: false,
            offsetY: 76,
            fontSize: "22px",
            color: undefined,
          },
        },
      },
    },
    chart: {
      height: 170,
      width: 148,
      type: "radialBar",
    },
    stroke: {
      lineCap: "round",
    },
    colors: ["var(--primary-color)"],
    labels: [""],
  },
};

export const COLUMNS = [
  {
    Header: "ID do pedido",
    accessor: "paymentId",
  },
  {
    Header: "ID do usuário",
    accessor: "userId",
    Cell: ({ value }) => {
      // Coluna oculta, apenas para ter acesso aos dados
      return null;
    },
  },
  {
    Header: "Nome do cliente",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "CPF",
    accessor: "cpf",
  },
  {
    Header: "Método de pagamento",
    accessor: "paymentMethod",
  },
  {
    Header: "Data da compra",
    accessor: "date",
    Cell: ({ value }) => {
      return dayjs(value).format("DD/MM/YYYY");
    },
  },
  {
    Header: "Valor do produto",
    accessor: "amount",
    Cell: ({ value }) => {
      return `R$ ${value.toFixed(2)}`;
    },
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      let badgeClass = "";
      let statusText = "";

      if (value === "PENDING") {
        badgeClass = "badge bg-orange";
        statusText = "Pendente";
      } else if (value === "PAID") {
        badgeClass = "badge bg-success";
        statusText = "Pago";
      } else if (value === "FAILED") {
        badgeClass = "badge bg-red";
        statusText = "Falhou";
      } else if (value === "CANCELED") {
        badgeClass = "badge bg-red";
        statusText = "Cancelado";
      }

      return <span className={badgeClass}>{statusText}</span>;
    },
  },
  {
    Header: "Ações",
    accessor: (row) => row,
    Cell: ({ value }) => {
      const [isApproving, setIsApproving] = useState(false);

      const handleApprove = async () => {
        if (isApproving) return;
        setIsApproving(true);

        console.log("Dados disponíveis para aprovação:", value);

        try {
          await axios.put("/api/orders/approve", {
            paymentId: value.paymentId,
          });

          // Integração com Spedy após aprovação
          if (value.userId) {
            await handleSpedyIntegration(
              value.userId,
              value.paymentId,
              value.amount
            );
          } else if (value.email) {
            await handleSpedyIntegration(
              value.email,
              value.paymentId,
              value.amount
            );
          } else {
            console.warn(
              "Nem userId nem email disponíveis para integração Spedy:",
              value
            );
          }

          toast.success(
            "Pagamento aprovado com sucesso! O saldo do usuário foi atualizado."
          );
          // Recarregar a página para atualizar os dados
          window.location.reload();
        } catch (error) {
          console.error("Erro ao aprovar pagamento:", error);
          toast.error("Erro ao aprovar pagamento. Tente novamente.");
        } finally {
          setIsApproving(false);
        }
      };

      // Só mostrar o botão se o status for PENDING
      if (value.status !== "PENDING") {
        return null;
      }

      return (
        <Button
          variant="success"
          size="sm"
          onClick={handleApprove}
          disabled={isApproving}
        >
          {isApproving ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-1"
              />
              Aprovando...
            </>
          ) : (
            "Aprovar"
          )}
        </Button>
      );
    },
  },
];

export const DATATABLE = [
  {
    PurchaseDate: "#01",
    ClientName: "Sean Black",
    ProductID: "PRO12345",
    Product: "Mi LED Smart TV 4A 80",
    PaymentMode: "Online Payment",
    Status: <span className="badge bg-success">Delivered</span>,
    ProductCost: "$14,500",
    color: "badge badge-success",
  },
  {
    PurchaseDate: "#02",
    ClientName: "Evan Rees",
    ProductID: "PRO8765",
    Product: "Thomson R9 122cm (48 inch) Full HD LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge bg-primary">Add Cart</span>,
    ProductCost: "$30,000",
  },
  {
    PurchaseDate: "#03",
    ClientName: "David Wallace",
    ProductID: "PRO54321",
    Product: "Vu 80cm (32 inch) HD Ready LED TV",
    PaymentMode: "Online Payment",
    Status: <span className="badge bg-orange">Pending</span>,
    ProductCost: "$13,200",
  },
  {
    PurchaseDate: "#04",
    ClientName: "Julia Bower",
    ProductID: "PRO97654",
    Product: "Micromax 81cm (32 inch) HD Ready LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge bg-secondary">Delivering</span>,
    ProductCost: "$15,100",
  },
  {
    PurchaseDate: "#05",
    ClientName: "Kevin James",
    ProductID: "PRO4532",
    Product: "HP 200 Mouse &amp; Wireless Laptop Keyboard",
    PaymentMode: "Online Payment",
    Status: <span className="badge bg-danger">Shipped</span>,
    ProductCost: "$5,987",
  },
  {
    PurchaseDate: "#06",
    ClientName: "Theresa Wright",
    ProductID: "$11,987",
    Product: "Digisol DG-HR3400 Router ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge bg-secondary">Delivering</span>,
    ProductCost: "$372,000",
  },
  {
    PurchaseDate: "#07",
    ClientName: "Sebastian	Black",
    ProductID: "PRO4567",
    Product: "Dell WM118 Wireless Optical Mouse",
    PaymentMode: "Online Payment",
    Status: <span className="badge bg-info">Add to Cart</span>,
    ProductCost: "$4,700",
  },
  {
    PurchaseDate: "#08",
    ClientName: "Kevin Glover",
    ProductID: "PRO32156",
    Product: "Dell 16 inch Laptop Backpack ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge bg-pink">Delivered</span>,
    ProductCost: "$678",
  },
];

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <input
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      className="form-control form-control-sm "
      placeholder="Search..."
    />
  );
};
export const BasicTable = ({ recentOrders }) => {
  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data: recentOrders,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, headerGroups, getTableBodyProps, prepareRow, page } =
    tableInstance;

  return (
    <table {...getTableProps()} className="table mb-0 table-bordered">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={Math.random()}
              >
                <Fragment>
                  <span>{column.render("Header")}</span>
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="fa fa-angle-down"></i>
                      ) : (
                        <i className="fa fa-angle-up"></i>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </Fragment>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={Math.random()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} key={Math.random()}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
