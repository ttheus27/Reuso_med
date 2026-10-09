import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { usePagination, useTable } from 'react-table';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

export class Statistics2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    height: 280,
                    type: 'line',
                    zoom: {
                        enabled: false,
                    },
                    dropShadow: {
                        enabled: true,
                        enabledOnSeries: undefined,
                        top: 5,
                        left: 0,
                        blur: 3,
                        color: '#000',
                        opacity: 0.1,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: -15,
                    fontWeight: 'bold',
                },
                stroke: {
                    curve: 'smooth',
                    width: '3',
                },
                grid: {
                    borderColor: '#f2f6f7',
                },
                colors: ['#FFFFFF', '#28a745'], // Branco para "Total de Pedidos" e Verde para "Total Faturado"
                xaxis: {
                    type: 'category',
                    categories: this.props.categories || [],
                    axisBorder: {
                        show: true,
                        color: 'rgba(119, 119, 142, 0.05)',
                        offsetX: 0,
                        offsetY: 0,
                    },
                    axisTicks: {
                        show: true,
                        borderType: 'solid',
                        color: 'rgba(119, 119, 142, 0.05)',
                        width: 6,
                        offsetX: 0,
                        offsetY: 0,
                    },
                    labels: {
                        rotate: -90,
                    },
                },

                tooltip: {
                    y: {
                        formatter: (value, { seriesIndex }) => {
                            if (seriesIndex === 0) {
                                return value;
                            }
                            return value?.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            });
                        },
                    },
                },
                labels: this.props.categories.map((month) =>
                    new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(
                        new Date(`${month}-01`)
                    )
                ),
            },
            series: this.props.series || [],
        };
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    height={285}
                />
            </div>
        );
    }
}

export class Budget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [
                {
                    name: 'This Week',
                    data: [44, 42, 57, 86, 58, 55, 70],
                },
                {
                    name: 'Last Week',
                    data: [-34, -22, -37, -56, -21, -35, -60],
                },
            ],

            options: {
                chart: {
                    stacked: true,
                    type: 'bar',
                    height: 280,
                },
                grid: {
                    borderColor: '#f2f6f7',
                },
                colors: ['var(--primary-color)', '#e4e7ed'],
                plotOptions: {
                    bar: {
                        borderRadius: 5,
                        colors: {
                            ranges: [
                                {
                                    from: -100,
                                    to: -46,
                                    color: '#ebeff5',
                                },
                                {
                                    from: -45,
                                    to: 0,
                                    color: '#ebeff5',
                                },
                            ],
                        },
                        columnWidth: '25%',
                        borderRadiusApplication: 'end',
                        borderRadiusWhenStacked: 'all',
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                legend: {
                    show: true,
                    position: 'top',
                },
                yaxis: {
                    title: {
                        style: {
                            color: '#adb5be',
                            fontSize: '14px',
                            fontFamily: 'poppins, sans-serif',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                    },
                    labels: {
                        formatter: function (y) {
                            return y.toFixed(0) + '';
                        },
                    },
                },
                xaxis: {
                    type: 'day',
                    categories: [
                        'Sun',
                        'Mon',
                        'Tue',
                        'Wed',
                        'Thu',
                        'Fri',
                        'sat',
                    ],
                    axisBorder: {
                        show: true,
                        color: 'rgba(119, 119, 142, 0.05)',
                        offsetX: 0,
                        offsetY: 0,
                    },
                    axisTicks: {
                        show: true,
                        borderType: 'solid',
                        color: 'rgba(119, 119, 142, 0.05)',
                        width: 6,
                        offsetX: 0,
                        offsetY: 0,
                    },
                    labels: {
                        rotate: -90,
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
                    type="bar"
                    height={270}
                />
            </div>
        );
    }
}

export class Viewers1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [
                {
                    name: 'Male',
                    data: [51, 44, 55, 42, 58, 50, 62],
                },
                {
                    name: 'Female',
                    data: [56, 58, 38, 50, 64, 45, 55],
                },
            ],
            options: {
                chart: {
                    height: 275,
                    type: 'line',
                    toolbar: {
                        show: false,
                    },
                    background: 'none',
                    fill: '#fff',
                },
                grid: {
                    borderColor: '#f2f6f7',
                },
                colors: ['var(--primary-color)', '#e4e7ed'],
                background: 'transparent',
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'straight',
                    width: 2,
                },

                legend: {
                    show: true,
                    position: 'top',
                },
                xaxis: {
                    type: 'day',
                    categories: [
                        'Mon',
                        'Tue',
                        'Wed',
                        'Thu',
                        'Fri',
                        'Sat',
                        'Sun',
                    ],
                    show: false,
                    axisBorder: {
                        show: false,
                        color: 'rgba(119, 119, 142, 0.05)',
                        offsetX: 0,
                        offsetY: 0,
                    },
                    axisTicks: {
                        show: false,
                        borderType: 'solid',
                        color: 'rgba(119, 119, 142, 0.05)',
                        width: 6,
                        offsetX: 0,
                        offsetY: 0,
                    },
                    labels: {
                        rotate: -90,
                    },
                },
                yaxis: {
                    show: false,
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm',
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
                    height={275}
                />
            </div>
        );
    }
}

export const COLUMNS = [
    {
        Header: 'Purchase Date',
        accessor: 'PurchaseDate',
        className: 'text-center ',
    },
    {
        Header: 'Client Name',
        accessor: 'ClientName',
        className: 'text-center ',
    },
    {
        Header: 'Product ID',
        accessor: 'ProductID',
        className: 'text-center ',
    },
    {
        Header: 'Product',
        accessor: 'Product',
        className: 'text-center ',
    },
    {
        Header: 'Product Cost',
        accessor: 'ProductCost',
        className: 'text-center ',
    },
    {
        Header: 'Payment Mode',
        accessor: 'PaymentMode',
        className: 'text-center ',
    },
    {
        Header: 'Status',
        accessor: 'Status',
    },
    {
        Header: 'ACTION',
        accessor: 'Action',
        className: 'text-center ',
    },
];

export const DATATABLE = [
    {
        PurchaseDate: '#01',
        ClientName: 'Sean Black',
        ProductID: 'PRO12345',
        Product: 'Mi LED Smart TV 4A 80',
        PaymentMode: 'Online Payment',
        Status: <span className="badge bg-success-transparent">Delivered</span>,
        ProductCost: '$14,500',
        Action: (
            <span className="">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-success btn-sm rounded-11 me-2"
                    >
                        <i>
                            <svg
                                className="table-edit"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-danger btn-sm rounded-11"
                    >
                        <i>
                            <svg
                                className="table-delete"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
            </span>
        ),
    },
    {
        PurchaseDate: '#02',
        ClientName: 'Garrett Winters',
        ProductID: 'PRO8765',
        Product: 'Thomson R9 122cm (48 inch) Full HD LED TV',
        PaymentMode: 'Cash on delivered',
        Status: <span className="badge bg-primary-transparent">Add Cart</span>,
        ProductCost: '$170,750',
        Action: (
            <span className="">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-success btn-sm rounded-11 me-2"
                    >
                        <i>
                            <svg
                                className="table-edit"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-danger btn-sm rounded-11"
                    >
                        <i>
                            <svg
                                className="table-delete"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
            </span>
        ),
    },
    {
        PurchaseDate: '#03',
        ClientName: 'Ashton Cox',
        ProductID: 'PRO54321',
        Product: 'Vu 80cm (32 inch) HD Ready LED TV',
        PaymentMode: 'Online Payment',
        Status: <span className="badge bg-danger-transparent">Pending</span>,
        ProductCost: '$86,000',
        Action: (
            <>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-success btn-sm br-5 me-2"
                    >
                        <i>
                            <svg
                                className="table-edit"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete</Tooltip>}
                >
                    <Link href="#!" className="btn btn-danger btn-sm br-5">
                        <i>
                            <svg
                                className="table-delete"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
            </>
        ),
    },
    {
        PurchaseDate: '#04',
        ClientName: 'Cedric Kelly',
        ProductID: 'PRO97654',
        Product: 'Micromax 81cm (32 inch) HD Ready LED TV',
        PaymentMode: 'Cash on delivered',
        Status: (
            <span className="badge bg-warning-transparent">Delivering</span>
        ),
        ProductCost: '$433,060',
        Action: (
            <span className="">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-success btn-sm rounded-11 me-2"
                    >
                        <i>
                            <svg
                                className="table-edit"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-danger btn-sm rounded-11"
                    >
                        <i>
                            <svg
                                className="table-delete"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
            </span>
        ),
    },
    {
        PurchaseDate: '#05',
        ClientName: 'Airi Satou',
        ProductID: 'PRO4532',
        Product: 'HP 200 Mouse &amp; Wireless Laptop Keyboard',
        PaymentMode: 'Online Payment',
        Status: <span className="badge bg-danger-transparent">Shipped</span>,
        ProductCost: '$162,700',
        Action: (
            <span className="">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-success btn-sm rounded-11 me-2"
                    >
                        <i>
                            <svg
                                className="table-edit"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-danger btn-sm rounded-11"
                    >
                        <i>
                            <svg
                                className="table-delete"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
            </span>
        ),
    },
    {
        PurchaseDate: '#06',
        ClientName: 'Brielle Williamson',
        ProductID: 'PRO6789',
        Product: 'Digisol DG-HR3400 Router ',
        PaymentMode: 'Cash on delivered',
        Status: (
            <span className="badge bg-primary-transparent">Delivering</span>
        ),
        ProductCost: '$372,000',
        Action: (
            <span className="">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-success btn-sm rounded-11 me-2"
                    >
                        <i>
                            <svg
                                className="table-edit"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-danger btn-sm rounded-11"
                    >
                        <i>
                            <svg
                                className="table-delete"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
            </span>
        ),
    },
    {
        PurchaseDate: '#07',
        ClientName: 'Herrod Chandler',
        ProductID: 'PRO4567',
        Product: 'Dell WM118 Wireless Optical Mouse',
        PaymentMode: 'Online Payment',
        Status: <span className="badge bg-info-transparent">Add to Cart</span>,
        ProductCost: '$137,500',
        Action: (
            <span className="">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-success btn-sm rounded-11 me-2"
                    >
                        <i>
                            <svg
                                className="table-edit"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-danger btn-sm rounded-11"
                    >
                        <i>
                            <svg
                                className="table-delete"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
            </span>
        ),
    },
    {
        PurchaseDate: '#08',
        ClientName: 'Rhona Davidson',
        ProductID: 'PRO32156',
        Product: 'Dell 16 inch Laptop Backpack ',
        PaymentMode: 'Cash on delivered',
        Status: <span className="badge bg-pink-transparent">Delivered</span>,
        ProductCost: '$327,900',
        Action: (
            <span className="">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-success btn-sm rounded-11 me-2"
                    >
                        <i>
                            <svg
                                className="table-edit"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete</Tooltip>}
                >
                    <Link
                        href="#!"
                        className="btn btn-danger btn-sm rounded-11"
                    >
                        <i>
                            <svg
                                className="table-delete"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 0 24 24"
                                width="16"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                            </svg>
                        </i>
                    </Link>
                </OverlayTrigger>
            </span>
        ),
    },
];

export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <input
            value={filter || ''}
            onChange={(e) => setFilter(e.target.value)}
            className="form-control form-control-sm  "
            placeholder="Search..."
        />
    );
};
export const Tabledata = () => {
    const tableInstance = useTable(
        {
            columns: COLUMNS,
            data: DATATABLE,
        },
        // useGlobalFilter,
        // useSortBy,
        usePagination
    );

    const {
        getTableProps,
        headerGroups,
        getTableBodyProps,
        prepareRow,
        state,
        setGlobalFilter,
        page,
    } = tableInstance;

    const { globalFilter } = state;

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
                <div>
                    {/* <GlobalFilter
                        filter={globalFilter}
                        setFilter={setGlobalFilter}
                    /> */}
                </div>
                {/* <ButtonGroup>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant=""
                            aria-expanded="false"
                            aria-haspopup="true"
                            className="btn-primary btn-sm btn-wave waves-effect waves-light"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButton1"
                            type="button"
                        >
                            Sort By
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            style={{ margin: '0px' }}
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
                </ButtonGroup> */}
            </div>
            <div className="table-responsive">
                <table
                    {...getTableProps()}
                    className="table  table-bordered text-nowrap mb-0"
                >
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                key={Math.random()}
                            >
                                {/* {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                        className={column.className}
                                        key={Math.random()}
                                    >
                                        <Fragment key={Math.random()}>
                                            <span className="tabletitle">
                                                {column.render('Header')}
                                            </span>
                                            <span>
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <i className="fa fa-angle-down"></i>
                                                    ) : (
                                                        <i className="fa fa-angle-up"></i>
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </span>
                                        </Fragment>
                                    </th>
                                ))} */}
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
                                                className="text-center"
                                                {...cell.getCellProps()}
                                                key={Math.random()}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};
