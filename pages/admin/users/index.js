import { nanoid } from 'nanoid';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { Fragment, useState } from 'react';
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
} from 'react-bootstrap';

import { toast } from 'react-toastify';
import { Savetable } from '../../../shared/data/tables/datatablesdata';
import Pageheader from '../../../shared/layout-components/pageheader/pageheader';
import Seo from '../../../shared/layout-components/seo/seo';
import { getAllUsers } from '../../api/server/db/users/getAllUsers';
import styles from './styles.module.scss';

const formatPhoneNumber = (phone) => {
    if (phone && typeof phone === 'object' && phone.display && phone.whatsapp) {
        return phone;
    }

    if (!phone || phone === 'Não cadastrado') return 'Não cadastrado';

    // Remove all non-digits
    const cleaned = (typeof phone === 'string' ? phone : String(phone)).replace(
        /\D/g,
        ''
    );

    if (cleaned.length === 11) {
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return {
                display: `(${match[1]}) ${match[2]}-${match[3]}`,
                whatsapp: `+55${cleaned}`,
            };
        }
    }
    return {
        display: phone,
        whatsapp: phone,
    };
};

const formatCPF = (cpf) => {
    if (!cpf || cpf === 'Não cadastrado') return 'Não cadastrado';
    // Remove all non-digits
    const cleaned = cpf.replace(/\D/g, '');
    // Format as XXX.XXX.XXX-XX
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
        return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return cpf;
};

const UsersComponent = ({ users }) => {
    const { data: session } = useSession();
    const userRole = session?.user?.role || 'SUBSCRIBER';

    const [contacts, setContacts] = useState(
        users?.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            balance: user.balance || 0,
            phoneNumber: formatPhoneNumber(user.phoneNumber),
            cpf: formatCPF(user.cpf),
            totalSpent: user.totalSpent || 0,
            orders: user.orders || [],
            createdAt: user.createdAt,
            imageUrl: user.imageUrl || '',
            suspended: user.suspended || false,
            password: user.password || '',
        }))
    );

    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
    const [modalShow, setModalShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        role: 'SUBSCRIBER',
        phoneNumber: '',
        cpf: '',
        balance: 0,
        password: '', // Senha temporária
        imageUrl: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const [sortOrder, setSortOrder] = useState('date_desc');

    // Função para lidar com a mudança no campo de pesquisa
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reinicia para a primeira página ao fazer uma nova pesquisa
    };

    const handleDateFilterChange = (e) => {
        const { name, value } = e.target;
        setDateFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
        setCurrentPage(1);
    };

    const isDateMatch = (user) => {
        if (!dateFilter.start && !dateFilter.end) return true;

        // If user hasn't spent anything, only show if no date filter is applied
        if (!user.spendingDates || user.spendingDates.length === 0) {
            return false;
        }

        const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
        const endDate = dateFilter.end ? new Date(dateFilter.end) : null;
        endDate?.setHours(23, 59, 59);

        // Check if any spending date falls within the range
        return user.spendingDates.some((spendingDate) => {
            const date = new Date(spendingDate);

            if (startDate && !endDate) {
                return date >= startDate;
            }
            if (!startDate && endDate) {
                return date <= endDate;
            }
            if (startDate && endDate) {
                return date >= startDate && date <= endDate;
            }
            return true;
        });
    };

    const handleSortByBalance = () => {
        setSortOrder((currentOrder) => {
            switch (currentOrder) {
                case 'none':
                    return 'desc';
                case 'desc':
                    return 'asc';
                default:
                    return 'none';
            }
        });
    };

    // Modifique a função de cálculo de gastos
    const calculateSpentInPeriod = (user, startDate, endDate) => {
        // Se não há filtro de data, retorna o total gasto (soma de todas as orders)
        if (!startDate && !endDate) {
            return (
                user.orders?.reduce(
                    (total, order) => total + order.totalPrice,
                    0
                ) || 0
            );
        }

        // Se tem filtro de data, calcula apenas dentro do período
        return (
            user.orders?.reduce((total, order) => {
                const orderDate = new Date(order.createdAt);

                // Se tem apenas data inicial
                if (startDate && !endDate && orderDate >= startDate) {
                    return total + order.totalPrice;
                }

                // Se tem apenas data final
                if (!startDate && endDate && orderDate <= endDate) {
                    return total + order.totalPrice;
                }

                // Se tem ambas as datas
                if (
                    startDate &&
                    endDate &&
                    orderDate >= startDate &&
                    orderDate <= endDate
                ) {
                    return total + order.totalPrice;
                }

                return total;
            }, 0) || 0
        );
    };

    // Modifique o filteredContacts
    const filteredContacts = contacts
        .map((contact) => {
            const startDate = dateFilter.start
                ? new Date(dateFilter.start)
                : null;
            const endDate = dateFilter.end ? new Date(dateFilter.end) : null;
            if (endDate) endDate.setHours(23, 59, 59);

            // Calcula o gasto no período ou total
            const periodSpent = calculateSpentInPeriod(
                contact,
                startDate,
                endDate
            );

            return {
                ...contact,
                periodSpent,
            };
        })
        .filter((contact) => {
            const matchesEmail = contact.email
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            // Se há filtro de data, só mostra contatos que têm gastos no período
            // Se não há filtro, mostra todos os contatos
            const hasSpentInPeriod =
                dateFilter.start || dateFilter.end
                    ? contact.periodSpent > 0
                    : true;

            return matchesEmail && hasSpentInPeriod;
        })
        .sort((a, b) => {
            if (sortOrder === 'none') return 0;
            if (sortOrder === 'desc') return b.balance - a.balance;
            if (sortOrder === 'asc') return a.balance - b.balance;
            // Usar periodSpent em vez de totalSpent para ordenação
            if (sortOrder === 'spent_desc')
                return b.periodSpent - a.periodSpent;
            if (sortOrder === 'spent_asc') return a.periodSpent - b.periodSpent;
            // Ordenar por data de criação
            if (sortOrder === 'date_desc')
                return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortOrder === 'date_asc')
                return new Date(a.createdAt) - new Date(b.createdAt);
            return 0;
        });

    // Paginação
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredContacts.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    const validateFields = () => {
        const { name, email, password } = formData;
        if (!name) return 'Nome';
        if (!email) return 'Email';
        if (!editMode && !password) return 'Senha';
        return null;
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        let formattedValue = value;

        if (name === 'phoneNumber') {
            // Remove tudo que não for dígito
            const cleaned = value.replace(/\D/g, '');

            // Aplica a formatação conforme digita
            if (cleaned.length <= 11) {
                if (cleaned.length <= 2) {
                    formattedValue = cleaned;
                } else if (cleaned.length <= 7) {
                    formattedValue = `(${cleaned.slice(0, 2)}) ${cleaned.slice(
                        2
                    )}`;
                } else {
                    formattedValue = `(${cleaned.slice(0, 2)}) ${cleaned.slice(
                        2,
                        7
                    )}-${cleaned.slice(7, 11)}`;
                }
            }
        } else if (name === 'cpf') {
            // Remove tudo que não for dígito
            const cleaned = value.replace(/\D/g, '');

            // Aplica a formatação conforme digita
            if (cleaned.length <= 11) {
                if (cleaned.length <= 3) {
                    formattedValue = cleaned;
                } else if (cleaned.length <= 6) {
                    formattedValue = `${cleaned.slice(0, 3)}.${cleaned.slice(
                        3
                    )}`;
                } else if (cleaned.length <= 9) {
                    formattedValue = `${cleaned.slice(0, 3)}.${cleaned.slice(
                        3,
                        6
                    )}.${cleaned.slice(6)}`;
                } else {
                    formattedValue = `${cleaned.slice(0, 3)}.${cleaned.slice(
                        3,
                        6
                    )}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
                }
            }
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: formattedValue,
        }));
    };

    const handleAdd = () => {
        setFormData({
            id: nanoid(),
            name: '',
            email: '',
            role: 'SUBSCRIBER',
            phoneNumber: '',
            cpf: '',
            balance: 0,
            password: '',
            imageUrl: '',
        });
        setEditMode(false);
        setModalShow(true);
    };

    const handleEdit = (contact) => {
        setFormData({
            id: contact.id,
            name: contact.name,
            email: contact.email,
            role: contact.role,
            phoneNumber: contact.phoneNumber?.display || '',
            cpf: contact.cpf || '',
            balance: contact.balance || 0,
            password: '', // Empty password means no change when editing
            imageUrl: contact.imageUrl || '',
        });
        setEditMode(true);
        setModalShow(true);
    };

    const handleSaveChanges = async (event) => {
        event.preventDefault();

        const missingField = validateFields();
        if (missingField) {
            toast.error(`Campo obrigatório: ${missingField}`);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(
                editMode ? `/api/user/updateUser` : `/api/user/createUser`,
                {
                    method: editMode ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                const updatedUser = await response.json();

                if (editMode) {
                    setContacts((prevContacts) =>
                        prevContacts.map((contact) =>
                            contact.id === updatedUser.id
                                ? updatedUser
                                : contact
                        )
                    );
                    toast.success('Usuário atualizado com sucesso! 🚀');
                    setModalShow(false);
                    // Refresh the page after updating a user
                    window.location.reload();
                } else {
                    setContacts((prevContacts) => [
                        ...prevContacts,
                        updatedUser,
                    ]);
                    toast.success('Usuário criado com sucesso! 🚀');
                    setModalShow(false);
                }
            } else {
                const errorData = await response.json();
                toast.error(
                    `Erro ao ${editMode ? 'atualizar' : 'criar'} usuário: ${
                        errorData.message
                    }`
                );
            }
        } catch (error) {
            console.error(
                `Erro ao ${editMode ? 'atualizar' : 'criar'} usuário:`,
                error
            );
            toast.error(
                `Erro ao ${
                    editMode ? 'atualizar' : 'criar'
                } usuário. Tente novamente!`
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const response = await fetch(`/api/user/deleteUser?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Usuário excluído com sucesso!🚀');
                setContacts((prevContacts) =>
                    prevContacts.filter((c) => c.id !== id)
                );
            } else {
                toast.error('Falha ao excluir o usuário. Tente novamente!');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Erro ao excluir o usuário!');
        } finally {
            setDeletingId(null);
        }
    };

    const handleToggleSuspend = async (userId, currentStatus) => {
        try {
            const response = await fetch(`/api/user/toggleSuspend`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, suspended: !currentStatus }),
            });

            if (response.ok) {
                setContacts((prevContacts) =>
                    prevContacts.map((contact) =>
                        contact.id === userId
                            ? { ...contact, suspended: !contact.suspended }
                            : contact
                    )
                );
                toast.success(
                    `Usuário ${
                        !currentStatus ? 'bloqueado' : 'desbloqueado'
                    } com sucesso! 🚀`
                );
            } else {
                toast.error(
                    'Falha ao alterar status do usuário. Tente novamente!'
                );
            }
        } catch (error) {
            console.error('Error toggling user suspend status:', error);
            toast.error('Erro ao alterar status do usuário!');
        }
    };

    return (
        <Fragment>
            <Seo title={'Usuários'} />
            <Pageheader title="Usuários" heading="Usuários" active="Usuários" />

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                USUÁRIOS CADASTRADOS
                            </div>
                            <div className={styles.blockWrap}>
                                <Form.Control
                                    type="text"
                                    placeholder="Pesquisar por e-mail"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-50"
                                />
                                <div className="d-flex gap-2">
                                    <div className="d-flex gap-2 align-items-center">
                                        <Form.Control
                                            type="date"
                                            name="start"
                                            value={dateFilter.start}
                                            onChange={handleDateFilterChange}
                                            style={{ width: 'auto' }}
                                            placeholder="Data inicial"
                                        />
                                        <span>até</span>
                                        <Form.Control
                                            type="date"
                                            name="end"
                                            value={dateFilter.end}
                                            onChange={handleDateFilterChange}
                                            style={{ width: 'auto' }}
                                            placeholder="Data final"
                                        />
                                    </div>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="outline-primary"
                                            className={styles.blockButton}
                                        >
                                            Filtro{' '}
                                            {sortOrder === 'desc' && (
                                                <i className="fa fa-sort-amount-down"></i>
                                            )}
                                            {sortOrder === 'asc' && (
                                                <i className="fa fa-sort-amount-up"></i>
                                            )}
                                            {sortOrder === 'date_desc' && (
                                                <i className="fa fa-calendar-alt"></i>
                                            )}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={() =>
                                                    setSortOrder('date_desc')
                                                }
                                                active={
                                                    sortOrder === 'date_desc'
                                                }
                                            >
                                                <i className="fa fa-calendar-alt me-2"></i>
                                                Mais Recentes
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() =>
                                                    setSortOrder('date_asc')
                                                }
                                                active={
                                                    sortOrder === 'date_asc'
                                                }
                                            >
                                                <i className="fa fa-calendar-alt me-2"></i>
                                                Mais Antigos
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item
                                                onClick={() =>
                                                    setSortOrder('desc')
                                                }
                                                active={sortOrder === 'desc'}
                                            >
                                                <i className="fa fa-sort-amount-down me-2"></i>
                                                Maior Saldo
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() =>
                                                    setSortOrder('asc')
                                                }
                                                active={sortOrder === 'asc'}
                                            >
                                                <i className="fa fa-sort-amount-up me-2"></i>
                                                Menor Saldo
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Divider />
                                            <Dropdown.Item
                                                onClick={() =>
                                                    setSortOrder('none')
                                                }
                                                active={sortOrder === 'none'}
                                            >
                                                <i className="fa fa-sort me-2"></i>
                                                Padrão
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Button
                                        variant="primary"
                                        onClick={handleAdd}
                                        className={styles.blockButton}
                                    >
                                        Adicionar novo usuário
                                    </Button>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Savetable
                                users={currentItems.map((user) => ({
                                    ...user,
                                    totalSpent:
                                        dateFilter.start || dateFilter.end
                                            ? user.periodSpent
                                            : calculateSpentInPeriod(
                                                  user,
                                                  null,
                                                  null
                                              ),
                                    password: user.password
                                        ? '••••••••'
                                        : 'Não definida',
                                }))}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onToggleSuspend={handleToggleSuspend}
                                deletingId={deletingId}
                            />
                            <div className="d-flex justify-content-center mt-4">
                                <Pagination>
                                    <Pagination.First
                                        onClick={() => handlePageChange(1)}
                                        disabled={currentPage === 1}
                                    />
                                    <Pagination.Prev
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                    />
                                    {[...Array(Math.min(5, totalPages))].map(
                                        (_, index) => {
                                            let pageNumber;
                                            if (totalPages <= 5) {
                                                pageNumber = index + 1;
                                            } else if (currentPage <= 3) {
                                                pageNumber = index + 1;
                                            } else if (
                                                currentPage >=
                                                totalPages - 2
                                            ) {
                                                pageNumber =
                                                    totalPages - 4 + index;
                                            } else {
                                                pageNumber =
                                                    currentPage - 2 + index;
                                            }

                                            if (
                                                pageNumber > 0 &&
                                                pageNumber <= totalPages
                                            ) {
                                                return (
                                                    <Pagination.Item
                                                        key={pageNumber}
                                                        active={
                                                            pageNumber ===
                                                            currentPage
                                                        }
                                                        onClick={() =>
                                                            handlePageChange(
                                                                pageNumber
                                                            )
                                                        }
                                                    >
                                                        {pageNumber}
                                                    </Pagination.Item>
                                                );
                                            }
                                            return null;
                                        }
                                    )}
                                    <Pagination.Next
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                    />
                                    <Pagination.Last
                                        onClick={() =>
                                            handlePageChange(totalPages)
                                        }
                                        disabled={currentPage === totalPages}
                                    />
                                </Pagination>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editMode ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSaveChanges}>
                        <Form.Group controlId="formName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Nome"
                                onChange={handleFormChange}
                                value={formData.name}
                                className="mb-2"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleFormChange}
                                value={formData.email}
                                className="mb-2"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                placeholder="Telefone"
                                onChange={handleFormChange}
                                value={formData.phoneNumber}
                                className="mb-2"
                            />
                        </Form.Group>

                        <Form.Group controlId="formCPF">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                type="text"
                                name="cpf"
                                placeholder="CPF"
                                onChange={handleFormChange}
                                value={formData.cpf}
                                className="mb-2"
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole">
                            <Form.Label>Nível de Acesso</Form.Label>
                            <Form.Select
                                name="role"
                                onChange={handleFormChange}
                                value={formData.role}
                                className="mb-2"
                                required
                            >
                                <option value="SUBSCRIBER">Usuário</option>
                                <option value="EDITOR">Gerente</option>
                                <option value="ADMIN">Administrador</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>
                                {editMode ? 'Nova Senha (opcional)' : 'Senha'}
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder={
                                    editMode
                                        ? 'Deixe em branco para manter a senha atual'
                                        : 'Senha'
                                }
                                onChange={handleFormChange}
                                value={formData.password}
                                className="mb-2"
                                required={!editMode}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />{' '}
                                    {editMode
                                        ? 'Salvando...'
                                        : 'Adicionando...'}
                                </>
                            ) : editMode ? (
                                'Salvar Alterações'
                            ) : (
                                'Adicionar'
                            )}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export const getServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const users = await getAllUsers();

    return {
        props: {
            users,
        },
    };
};

UsersComponent.layout = 'Contentlayout';
export default UsersComponent;
