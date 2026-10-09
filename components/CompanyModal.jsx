import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { formatCurrencyInputBRL, humanFileSize } from '../utils/formatters';

export default function CompanyModal({
    show,
    onHide,
    isEditing,
    loading,
    form,
    setForm,
    users,
    contractFile,
    setContractFile,
    monthlySectionRef,
    monthlyAmountRef,
    onSave,
}) {
    const handleContractChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setContractFile(file);
    };
    const handleRemoveContract = () => setContractFile(null);

    // normaliza o dia entre 1..31, preservando vazio quando o usuário apaga
    const setDueDaySafe = (raw) => {
        if (raw === '' || raw === null || raw === undefined) {
            setForm({ ...form, dueDay: '' });
            return;
        }
        const n = Number(raw);
        if (Number.isNaN(n)) return;
        const clamped = Math.max(1, Math.min(31, n));
        setForm({ ...form, dueDay: clamped });
    };

    const normalizeWebsite = (u) => {
        if (!u) return '';
        let s = String(u).trim();
        if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
        try {
            const url = new URL(s);
            return url.href;
        } catch {
            return String(u).trim();
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {isEditing ? 'Editar Empresa' : 'Criar Empresa'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <Form>
                    <Row className="g-3">
                        <Col md={8}>
                            <Form.Group>
                                <Form.Label>Nome da empresa *</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.cnpj}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            cnpj: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Responsável</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.responsible}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            responsible: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>WhatsApp</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.whatsapp}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            whatsapp: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Website</Form.Label>
                                <Form.Control
                                    type="url"
                                    placeholder="www.exemplo.com.br"
                                    value={form.website ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            website: e.target.value,
                                        })
                                    }
                                    onBlur={(e) =>
                                        setForm({
                                            ...form,
                                            website: normalizeWebsite(
                                                e.target.value
                                            ),
                                        })
                                    }
                                />
                                <Form.Text className="text-muted">
                                    Pode informar só o domínio (ex.:{' '}
                                    <code>www.exemplo.com.br</code>).
                                </Form.Text>
                            </Form.Group>
                        </Col>

                        <Col md={8}>
                            <Form.Group>
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.address}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            address: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>CEP</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.zipCode}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            zipCode: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.city}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            city: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.state}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            state: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Vendedor</Form.Label>
                                <Form.Select
                                    value={form.sellerId}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            sellerId: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">— Selecione —</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.name || u.email}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Customer Success</Form.Label>
                                <Form.Select
                                    value={form.csId}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            csId: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">— Selecione —</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.name || u.email}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Notas</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={form.notes}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            notes: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Check
                                type="switch"
                                id="hasMonthlyFee"
                                label="Possui mensalidade?"
                                checked={form.hasMonthlyFee}
                                style={{ marginTop: '20px' }}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setForm({
                                        ...form,
                                        hasMonthlyFee: checked,
                                    });
                                    if (checked) {
                                        requestAnimationFrame(() => {
                                            monthlySectionRef.current?.scrollIntoView(
                                                {
                                                    behavior: 'smooth',
                                                    block: 'start',
                                                }
                                            );
                                            setTimeout(
                                                () =>
                                                    monthlyAmountRef.current?.focus(),
                                                250
                                            );
                                        });
                                    }
                                }}
                            />
                        </Col>
                    </Row>

                    {form.hasMonthlyFee && (
                        <div ref={monthlySectionRef}>
                            <hr className="my-4" />
                            <h6 className="mb-3">Mensalidade</h6>
                            <Row className="g-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>
                                            Valor da mensalidade
                                        </Form.Label>
                                        <Form.Control
                                            ref={monthlyAmountRef}
                                            type="text"
                                            placeholder="R$ 0,00"
                                            value={form.monthlyFeeAmount}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    monthlyFeeAmount:
                                                        formatCurrencyInputBRL(
                                                            e.target.value
                                                        ),
                                                })
                                            }
                                        />
                                    </Form.Group>
                                </Col>

                                {/* >>>>> SOMENTE DIA DO MÊS (1..31) <<<<< */}
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>
                                            Dia do vencimento (1–31)
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            inputMode="numeric"
                                            min={1}
                                            max={31}
                                            placeholder="ex.: 10"
                                            value={form.dueDay ?? ''}
                                            onChange={(e) =>
                                                setDueDaySafe(e.target.value)
                                            }
                                            onBlur={(e) =>
                                                setDueDaySafe(e.target.value)
                                            }
                                        />
                                        <Form.Text className="text-muted">
                                            A cobrança ocorrerá todo mês nesse
                                            dia.
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    )}

                    <hr className="my-4" />
                    <h6 className="mb-3">Contrato</h6>

                    <input
                        id="contractInput"
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,image/*,application/pdf"
                        onChange={handleContractChange}
                        style={{ display: 'none' }}
                    />

                    {form.contractUrl && !contractFile ? (
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <span className="badge bg-success me-2">
                                    Anexado
                                </span>
                                <a
                                    href={form.contractUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-decoration-underline"
                                >
                                    {form.contractFilename || 'Abrir contrato'}
                                </a>
                            </div>
                            <Button
                                size="sm"
                                variant="outline-secondary"
                                onClick={() =>
                                    document
                                        .getElementById('contractInput')
                                        ?.click()
                                }
                            >
                                Trocar arquivo
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Form.Group>
                                <Form.Label>
                                    Anexar documento (PDF, DOC, DOCX, JPG, PNG)
                                </Form.Label>
                                <Button
                                    variant="outline-primary"
                                    onClick={() =>
                                        document
                                            .getElementById('contractInput')
                                            ?.click()
                                    }
                                >
                                    Selecionar arquivo
                                </Button>
                            </Form.Group>

                            {contractFile && (
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <div className="text-muted">
                                        <i className="fe fe-file me-2" />
                                        {contractFile.name} •{' '}
                                        {humanFileSize(contractFile.size)}
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline-danger"
                                        onClick={handleRemoveContract}
                                    >
                                        Remover
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={onSave} disabled={loading}>
                    {loading ? (
                        <Spinner as="span" animation="border" size="sm" />
                    ) : isEditing ? (
                        'Salvar alterações'
                    ) : (
                        'Criar Empresa'
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
