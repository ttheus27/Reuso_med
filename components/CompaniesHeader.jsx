import { Button, Form, InputGroup } from 'react-bootstrap';
import styles from './styles.module.scss';

export default function CompaniesHeader({
    searchTerm,
    setSearchTerm,
    onCreate,
    isEditing,
    activeFilter,
    setActiveFilter,
    lpsProfile = 'GROWTH',
    onLpsProfileChange,
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

            {/* Filtros e Seletor de Variabilidade da LPS */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
                <div className="d-flex flex-wrap gap-2">
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

                {/* Seletor de Variabilidade da Linha de Produto (LPS) */}
                <div className="d-flex align-items-center gap-1 p-1 bg-light rounded border">
                    <span className="fs-12 fw-bold text-muted px-2">
                        <i className="fe fe-sliders me-1 text-primary" />
                        Variabilidade LPS:
                    </span>
                    <Button
                        size="sm"
                        variant={lpsProfile === 'STARTER' ? 'primary' : 'outline-light text-dark'}
                        className="fw-semibold px-2 py-1 fs-12"
                        onClick={() => onLpsProfileChange && onLpsProfileChange('STARTER')}
                        title="Plano Starter (PME): Oculta colunas de CS e Vendedor"
                    >
                        Starter (PME)
                    </Button>
                    <Button
                        size="sm"
                        variant={lpsProfile === 'GROWTH' ? 'primary' : 'outline-light text-dark'}
                        className="fw-semibold px-2 py-1 fs-12"
                        onClick={() => onLpsProfileChange && onLpsProfileChange('GROWTH')}
                        title="Plano Growth (CS/Vendas): Exibe colunas de CS e Vendedor"
                    >
                        Growth (CS/Vendas)
                    </Button>
                    <Button
                        size="sm"
                        variant={lpsProfile === 'VIP' ? 'danger' : 'outline-light text-dark'}
                        className="fw-semibold px-2 py-1 fs-12 shadow-sm"
                        onClick={() => onLpsProfileChange && onLpsProfileChange('VIP')}
                        title="Plano VIP Enterprise: Módulo comercial completo"
                    >
                        VIP Enterprise
                    </Button>
                </div>
            </div>
        </div>
    );
}
