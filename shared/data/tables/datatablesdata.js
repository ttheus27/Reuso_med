import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from 'react-table';

export const Savetable = ({
    users,
    onEdit,
    onDelete,
    onToggleSuspend,
    deletingId,
}) => {
    const { data: session } = useSession();
    const userRole = session?.user?.role || 'SUBSCRIBER';

    return (
        <div className="app-container">
            <div className="table-responsive">
                <Table
                    id="delete-datatable"
                    className="table table-bordered text-nowrap border-bottom"
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>CPF</th>
                            <th>Nível de acesso</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((contact) => (
                            <ReadOnlyRow
                                key={contact.id}
                                user={contact}
                                onEdit={() => onEdit(contact)}
                                onDelete={() => onDelete(contact.id)}
                                onToggleSuspend={() =>
                                    onToggleSuspend(
                                        contact.id,
                                        contact.suspended
                                    )
                                }
                                isDeleting={deletingId === contact.id}
                                userRole={userRole}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

const ReadOnlyRow = ({
    user,
    onEdit,
    onDelete,
    onToggleSuspend,
    isDeleting,
    userRole,
}) => {
    const formatDateToBR = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'N/A';
            return date.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch (error) {
            return 'N/A';
        }
    };

    const formatRole = (role) => {
        if (role === 'SUBSCRIBER') return 'Usuário';
        if (role === 'EDITOR') return 'Gerente';
        if (role === 'ADMIN') return 'Administrador';
        return role;
    };

    const formatPhoneNumber = (phone) => {
        if (!phone || phone === 'Não cadastrado') return 'Não cadastrado';

        // Se o telefone já for um objeto com nosso formato
        if (typeof phone === 'object' && phone.display && phone.whatsapp) {
            return phone.whatsapp;
        }

        // Se for uma string, remove caracteres não numéricos
        let numbers = '';
        if (typeof phone === 'string') {
            numbers = phone
                .split('')
                .filter((char) => /\d/.test(char))
                .join('');
        } else {
            return 'Não cadastrado';
        }

        // Adiciona o prefixo 55 se não existir
        const fullNumber = numbers.startsWith('55') ? numbers : `55${numbers}`;
        return fullNumber;
    };

    const getWhatsAppLink = (phone) => {
        if (!phone || phone === 'Não cadastrado') return null;
        const formattedPhone = formatPhoneNumber(phone);
        return `https://wa.me/${formattedPhone}`;
    };

    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                {user.phoneNumber ? (
                    <a
                        href={getWhatsAppLink(user.phoneNumber)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                        style={{ cursor: 'pointer', textDecoration: 'none' }}
                    >
                        {typeof user.phoneNumber === 'object'
                            ? user.phoneNumber.display
                            : user.phoneNumber}{' '}
                        <i className="fab fa-whatsapp text-success"></i>
                    </a>
                ) : (
                    'Não cadastrado'
                )}
            </td>
            <td>{user.cpf || 'Não cadastrado'}</td>
            <td>{formatRole(user.role)}</td>
            <td>
                <span
                    className={`badge bg-${
                        user.suspended ? 'danger' : 'success'
                    }`}
                >
                    {user.suspended ? 'Bloqueado' : 'Ativo'}
                </span>
            </td>
            <td>
                <div className="d-flex gap-2 justify-content-center">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={onEdit}
                        title="Editar"
                    >
                        <i className="fa fa-edit"></i>
                    </Button>
                    <Button
                        variant={user.suspended ? 'success' : 'warning'}
                        size="sm"
                        onClick={onToggleSuspend}
                        title={user.suspended ? 'Desbloquear' : 'Bloquear'}
                    >
                        <i
                            className={`fa fa-${
                                user.suspended ? 'unlock' : 'lock'
                            }`}
                        ></i>
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={onDelete}
                        disabled={isDeleting}
                        title="Excluir"
                    >
                        {isDeleting ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            <i className="fa fa-trash"></i>
                        )}
                    </Button>
                </div>
            </td>
        </tr>
    );
};

export const COLUMNS = [
    {
        Header: 'Código do Cupom',
        accessor: 'code',
    },
    {
        Header: 'Desconto',
        accessor: 'discount',
    },
    {
        Header: 'Data de Expiração',
        accessor: 'expirationDate',
    },
    {
        Header: 'Tipo de desconto',
        accessor: 'discountType',
    },
    {
        Header: 'Ativo',
        accessor: 'isActive',
        Cell: ({ value }) => (value ? 'Sim' : 'Não'), // Exibe "Sim" ou "Não"
    },
];

export const DATATABLE = [
    {
        Id: '1',
        Name: 'Tiger Nixon',
        Position: 'System Architect',
        Office: 'Edinburgh',
        Age: '61',
        date: '2011-04-25',
        Salary: '$320,800',
    },
    {
        Id: '2',
        Name: 'Garrett Winters',
        Position: 'Accountant',
        Office: 'Tokyo',
        Age: '63',
        date: '2011-07-25',
        Salary: '$170,750',
    },
    {
        Id: '3',
        Name: 'Ashton Cox',
        Position: 'Junior Technical Author',
        Office: 'San Francisco',
        Age: '66',
        date: '2009-01-12',
        Salary: '$86,000',
    },
    {
        Id: '4',
        Name: 'Cedric Kelly',
        Position: 'Senior Javascript Developer',
        Office: 'Edinburgh',
        Age: '22',
        date: '2012-03-29',
        Salary: '$433,060',
    },
    {
        Id: '5',
        Name: 'Airi Satou',
        Position: 'Accountant',
        Office: 'Tokyo',
        Age: '33',
        date: '2010-10-14',
        Salary: '$162,700',
    },
    {
        Id: '6',
        Name: 'Brielle Williamson',
        Position: 'Integration Specialist',
        Office: 'New York',
        Age: '61',
        date: '2009-09-15',
        Salary: '$372,000',
    },
];
export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span className="d-flex ms-auto">
            <input
                value={filter || ''}
                onChange={(e) => setFilter(e.target.value)}
                className="form-control mb-4"
                placeholder="Search..."
            />
        </span>
    );
};
export const BasicTable = () => {
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
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
    } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <>
            <div className="d-flex">
                <select
                    className=" mb-4 selectpage border me-1"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    {[10, 25, 50]?.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                />
            </div>
            <table
                {...getTableProps()}
                className="table table-hover mb-0 table-bordered"
            >
                <thead>
                    {headerGroups?.map((headerGroup) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={Math.random()}
                        >
                            {headerGroup.headers?.map((column) => (
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
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page?.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={Math.random()}>
                                {row.cells?.map((cell) => {
                                    return (
                                        <td
                                            className="borderrigth"
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
            <div className="d-block d-sm-flex mt-4 ">
                <span className="">Showing 1 to 10 of 57 entries</span>
                <span className="ms-sm-auto ">
                    <Button
                        variant=""
                        className="btn-outline-light tablebutton me-2 d-sm-inline d-block my-1"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {' Previous '}
                    </Button>
                    <Button
                        variant=""
                        className="btn-outline-light tablebutton me-2 my-1"
                        onClick={() => {
                            previousPage();
                        }}
                        disabled={!canPreviousPage}
                    >
                        {' << '}
                    </Button>
                    <Button
                        variant=""
                        className="btn-outline-light tablebutton me-2 my-1"
                        onClick={() => {
                            previousPage();
                        }}
                        disabled={!canPreviousPage}
                    >
                        {' < '}
                    </Button>
                    <Button
                        variant=""
                        className="btn-outline-light tablebutton me-2 my-1"
                        onClick={() => {
                            nextPage();
                        }}
                        disabled={!canNextPage}
                    >
                        {' > '}
                    </Button>
                    <Button
                        variant=""
                        className="btn-outline-light tablebutton me-2 my-1"
                        onClick={() => {
                            nextPage();
                        }}
                        disabled={!canNextPage}
                    >
                        {' >> '}
                    </Button>
                    <Button
                        variant=""
                        className="btn-outline-light tablebutton me-2 d-sm-inline d-block my-1"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {' Next '}
                    </Button>
                </span>
            </div>
        </>
    );
};
//

export const ResponsiveDataTable = () => {
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
        canNextPage,
        // canPreviousPage,
        // _pageOptions,
        gotoPage,
        pageCount,
        // setPageSize,
    } = tableInstance;

    const { globalFilter } = state;

    return (
        <>
            <div className="e-table">
                <div className="d-flex">
                    <GlobalResFilter
                        filter={globalFilter}
                        setFilter={setGlobalFilter}
                    />
                </div>
                <div className="table-responsive table-bordered text-center">
                    <Table
                        {...getTableProps()}
                        className="table-bordered text-nowrap border-bottom"
                    >
                        <thead>
                            {headerGroups?.map((headerGroup) => (
                                <tr
                                    key={Math.random()}
                                    {...headerGroup.getHeaderGroupProps()}
                                >
                                    {headerGroup.headers?.map((column) => (
                                        <th
                                            key={Math.random()}
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps()
                                            )}
                                            className={column.className}
                                        >
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
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page?.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        key={Math.random()}
                                        className="text-center"
                                        {...row.getRowProps()}
                                    >
                                        {row.cells?.map((cell) => {
                                            return (
                                                <td
                                                    key={Math.random()}
                                                    {...cell.getCellProps()}
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="d-block d-sm-flex mt-4 ">
                    <span className="">Showing 1 to 10 of 57 entries</span>
                    <span className="ms-sm-auto ">
                        <Button
                            variant=""
                            className="btn-outline-light tablebutton me-2 my-2 d-sm-inline d-block"
                            onClick={() => gotoPage(0)}
                            disabled={!canNextPage}
                        >
                            {' Previous '}
                        </Button>
                        <Button
                            variant="primary"
                            className="tablebutton me-2 my-2"
                            onClick={() => {
                                previousPage();
                            }}
                            // disabled={!canPreviousPage}
                        >
                            {' 1 '}
                        </Button>
                        <Button
                            variant=""
                            className="btn-outline-light tablebutton me-2 my-2"
                            onClick={() => {
                                nextPage();
                            }}
                            disabled={!canNextPage}
                        >
                            {' 2 '}
                        </Button>
                        <Button
                            variant=""
                            className="btn-outline-light tablebutton me-2 my-2"
                            onClick={() => {
                                nextPage();
                            }}
                            disabled={!canNextPage}
                        >
                            {' 3 '}
                        </Button>
                        <Button
                            variant=""
                            className="btn-outline-light tablebutton me-2 my-2"
                            onClick={() => {
                                nextPage();
                            }}
                            disabled={!canNextPage}
                        >
                            {' 4'}
                        </Button>
                        <Button
                            variant=""
                            className="btn-outline-light tablebutton me-2 my-2"
                            onClick={() => {
                                nextPage();
                            }}
                            disabled={!canNextPage}
                        >
                            {' 5 '}
                        </Button>
                        <Button
                            variant=""
                            className="btn-outline-light tablebutton me-2 my-2"
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        >
                            {' Next '}
                        </Button>
                    </span>
                </div>
            </div>
        </>
    );
};
const GlobalResFilter = ({ filter, setFilter }) => {
    return (
        <span className="d-flex ms-auto">
            <input
                value={filter || ''}
                onChange={(e) => setFilter(e.target.value)}
                className="form-control mb-4"
                placeholder="Search..."
            />
        </span>
    );
};
