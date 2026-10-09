import React, { Fragment } from "react";
import { Button, Breadcrumb, Row, Col, Card, Dropdown, DropdownButton, ButtonGroup, Form, Collapse } from "react-bootstrap";
import dynamic from "next/dynamic";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
const ReactApexChart = dynamic(
	() => import("react-apexcharts"),
	{ ssr: false }
);
export class Budget extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [{
				name: "active",
				data: [44, 42, 57, 86, 58, 55, 70, 43, 23, 54, 77, 34],
			}, {
				name: "inactive",
				data: [-34, -22, -37, -56, -21, -35, -60, -34, -56, -78, -89, -53],
			}],

			options: {
				chart: {
					stacked: true,
					type: "bar",
					height: 370,
				},
				grid: {
					borderColor: "#f2f6f7",
				},
				colors: ["var(--primary-color)", "#e4e7ed"],
				plotOptions: {
					bar: {
						borderRadius: 5,
						colors: {
							ranges: [{
								from: -100,
								to: -46,
								color: "#ebeff5"
							}, {
								from: -45,
								to: 0,
								color: "#ebeff5"
							}]
						},
						columnWidth: "25%",
						borderRadiusApplication: "end",
						borderRadiusWhenStacked: "all"
					}
				},
				dataLabels: {
					enabled: false,
				},
				legend: {
					show: true,
					position: "top",
				},
				yaxis: {
					title: {
						text: "Growth",
						style: {
							color: "	#adb5be",
							fontSize: "14px",
							fontFamily: "poppins, sans-serif",
							fontWeight: 600,
							cssClass: "apexcharts-yaxis-label",
						},
					},
					labels: {
						formatter: function (y) {
							return y.toFixed(0) + "";
						}
					}
				},
				xaxis: {
					type: "month",
					categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "sep", "oct", "nov", "dec"],
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
						offsetY: 0
					},
					labels: {
						rotate: -90
					}
				}
			},

		};
	}

	render() {
		return (
			<div id="chart">
				<ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={365} />
			</div>
		);
	}
}
export class Visitors extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [{
				name: "Male",
				data: [44, 42, 57, 86, 58, 55, 70],
				// color:['#766df9']
			}, {
				name: "Female",
				data: [34, 22, 47, 56, 21, 35, 60],
				// color:['#ebeff5']
			}
			],

			options: {
				chart: {
					type: "bar",
					stacked: true,
					height: 338,
				},
				grid: {
					borderColor: "#eff2f6",
				},
				colors: ["var(--primary-color)", "#e4e7ed"],
				plotOptions: {
					bar: {
						horizontal: false,
						columnWidth: "30%",
					},
				},

				dataLabels: {
					enabled: false
				},
				stroke: {
					show: true,
					width: 2,
					colors: ["transparent"]
				},
				states: {
					hover: {
						filter: {
							type: "none"
						}
					}
				}, yaxis: {
					title: {
						style: {
							color: "	#adb5be",
							fontSize: "14px",
							fontFamily: "poppins, sans-serif",
							fontWeight: 600,
							cssClass: "apexcharts-yaxis-label",
						},
					},
					labels: {
						formatter: function (y) {
							return y.toFixed(0) + "";
						}
					}
				},
				xaxis: {
					categories: ["Mon", "Tue", "Web", "Thu", "Fri", "Sat", "Sun"],
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
						offsetY: 0
					},
				},
				fill: {
					opacity: 1
				},
				legend: {
					position: "top"
				},
			},

		};
	}

	render() {
		return (
			<div id="chart">
				<ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={340} />
			</div>
		);
	}
}

export const COLUMNS = [
	{
		Header: "Purchase Date",
		accessor: "PurchaseDate",
		className: "text-center ",
	},
	{
		Header: "Client Name",
		accessor: "ClientName",
		className: "text-center ",
	},
	{
		Header: "Product ID",
		accessor: "ProductID",
		className: "text-center ",
	},
	{
		Header: "Product",
		accessor: "Product",
		className: "text-center ",
	},
	{
		Header: "Product Cost",
		accessor: "ProductCost",
		className: "text-center ",
	},
	{
		Header: "Payment Mode",
		accessor: "PaymentMode",
		className: "text-center ",
	},
	{
		Header: "Status",
		accessor: "Status",
		className: "text-center ",
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
			className="form-control form-control-sm  "
			placeholder="Search..."
		/>

	);
};
export const Tabledata3 = () => {
	const tableInstance = useTable(
		{
			columns: COLUMNS,
			data: DATATABLE,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const {
		getTableProps, // table props from react-table
		headerGroups, // headerGroups, if your table has groupings
		getTableBodyProps, // table body props from react-table
		prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
		state,
		setGlobalFilter,
		page, // use, page or rows
		nextPage,
		previousPage,
		// canNextPage,
		// canPreviousPage,
		pageOptions,
		gotoPage,
		pageCount,
		setPageSize,
	} = tableInstance;

	const { globalFilter, pageIndex, pageSize } = state;

	return (
		<>
			<div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
				<div>
					<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
				</div>
				<ButtonGroup  >
					<Dropdown>
						<Dropdown.Toggle
							variant=""
							aria-expanded="false"
							aria-haspopup="true"
							className="btn-primary btn-sm btn-wave waves-effect waves-light"
							data-bs-toggle="dropdown"
							id="dropdownMenuButton1"
							type="button"	  >
							Sort By
						</Dropdown.Toggle>
						<Dropdown.Menu
							style={{ margin: "0px" }}
							className="dropdown-menu tx-13"
						>
							<Dropdown.Item className="dropdown-item" href="#!">
								New
							</Dropdown.Item>
							<Dropdown.Item className="dropdown-item" href="#!">
								Popular
							</Dropdown.Item>
							<Dropdown.Item className="dropdown-item" href="#!">
								Relevant
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

				</ButtonGroup>
			</div>
			<table
				{...getTableProps()}
				className="table  mb-0 table-bordered"
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									className={column.className}
									key={Math.random()}
								>
									<Fragment key={Math.random()}>
										<span className="tabletitle">{column.render("Header")}</span>
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
								{row.cells.map((cell) => {
									return (
										<td
											className="borderrigth"
											{...cell.getCellProps()}
											key={Math.random()}
										>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>

		</>
	);
};
