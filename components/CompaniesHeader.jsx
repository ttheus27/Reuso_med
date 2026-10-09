import { Button, Form, InputGroup } from 'react-bootstrap';
import styles from './styles.module.scss';

export default function CompaniesHeader({
    searchTerm,
    setSearchTerm,
    onCreate,
    isEditing,
    activeFilter,
    setActiveFilter,
}) {
    return (
        <div>
            <InputGroup className={styles.inputGroup}>
                <div className={styles.formGroup}>
                    <Form.Control
                        type="text"
                        placeholder="Pesquisar por nome, responsável, contato, vendedor ou CS..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputGroup.Text className="btn btn-primary">
                        Pesquisar
                    </InputGroup.Text>
                </div>
                <div>
                    <Button className="btn btn-primary ms-2" onClick={onCreate}>
                        <i className="fe fe-plus me-1" />{' '}
                        {isEditing ? 'Editar Empresa' : 'Nova Empresa'}
                    </Button>
                </div>
            </InputGroup>

            {/* Filtros */}
            <div className="d-flex gap-2 mt-3">
                <Button
                    variant={
                        activeFilter === 'all' ? 'primary' : 'outline-primary'
                    }
                    size="sm"
                    onClick={() => setActiveFilter('all')}
                >
                    <i className="fe fe-grid me-1" />
                    Todas
                </Button>

                <Button
                    variant={
                        activeFilter === 'withMonthly'
                            ? 'success'
                            : 'outline-success'
                    }
                    size="sm"
                    onClick={() => setActiveFilter('withMonthly')}
                >
                    <i className="fe fe-dollar-sign me-1" />
                    Com Mensalidade
                </Button>

                <Button
                    variant={
                        activeFilter === 'noMonthly'
                            ? 'warning'
                            : 'outline-warning'
                    }
                    size="sm"
                    onClick={() => setActiveFilter('noMonthly')}
                >
                    <i className="fe fe-alert-circle me-1" />
                    Sem Mensalidade
                </Button>

                <Button
                    variant={
                        activeFilter === 'noContract'
                            ? 'danger'
                            : 'outline-danger'
                    }
                    size="sm"
                    onClick={() => setActiveFilter('noContract')}
                >
                    <i className="fe fe-file-text me-1" />
                    Sem Contrato
                </Button>
            </div>
        </div>
    );
}
