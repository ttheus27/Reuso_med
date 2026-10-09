// pages/admin/companies/hooks/useCompaniesPage.js
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
    createCompany,
    deleteCompany,
    updateCompany,
} from '../services/companiesApi';
import { uploadContractToFirebase } from '../utils/firebaseUpload';
import { formatCurrencyInputBRL } from '../utils/formatters';

const ITEMS_PER_PAGE = 8;

export function useCompaniesPage(initialCompanies = [], usersList = []) {
    // ---------- state ----------
    const [companies, setCompanies] = useState(initialCompanies);
    const [users] = useState(usersList);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'withMonthly', 'noMonthly', 'noContract'

    // modal/form
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [companyToEdit, setCompanyToEdit] = useState(null);
    const [contractFile, setContractFile] = useState(null);
    const monthlySectionRef = useRef(null);
    const monthlyAmountRef = useRef(null);

    // drawer (sidebar de detalhes)
    const [showDrawer, setShowDrawer] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const [form, setForm] = useState({
        name: '',
        responsible: '',
        email: '',
        phone: '',
        whatsapp: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cnpj: '',
        notes: '',
        website: '',
        sellerId: '',
        csId: '',
        hasMonthlyFee: false,
        monthlyFeeAmount: '',
        dueDay: '', // <<-- apenas o dia (1..31)
        contractUrl: '',
        contractFilename: '',
    });

    // ---------- helpers ----------
    const resetForm = () => {
        setForm({
            name: '',
            responsible: '',
            email: '',
            phone: '',
            whatsapp: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            cnpj: '',
            notes: '',
            sellerId: '',
            website: '',
            csId: '',
            hasMonthlyFee: false,
            monthlyFeeAmount: '',
            dueDay: '',
            contractUrl: '',
            contractFilename: '',
        });
        setContractFile(null);
        setIsEditing(false);
        setCompanyToEdit(null);
    };

    const validate = () => {
        if (!form.name) return 'Nome da empresa';
        if (form.hasMonthlyFee) {
            if (!form.monthlyFeeAmount) return 'Valor da mensalidade';
            const d = Number(form.dueDay);
            if (!d || d < 1 || d > 31) return 'Dia do vencimento (1–31)';
        }
        return null;
    };

    // ---------- search/pagination ----------
    const filtered = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        let result = companies;

        // Aplicar filtro de tipo
        if (activeFilter === 'withMonthly') {
            // empresas com pelo menos uma mensalidade
            result = result.filter(
                (c) => Array.isArray(c.monthlyFees) && c.monthlyFees.length > 0
            );
        } else if (activeFilter === 'noMonthly') {
            // empresas sem nenhuma mensalidade
            result = result.filter(
                (c) =>
                    !Array.isArray(c.monthlyFees) || c.monthlyFees.length === 0
            );
        } else if (activeFilter === 'noContract') {
            // empresas sem contrato
            result = result.filter((c) => !c.contractUrl);
        }

        // Aplicar busca por texto
        if (q) {
            result = result.filter((c) => {
                const hay = [
                    c.name,
                    c.responsible,
                    c.email,
                    c.phone,
                    c.whatsapp,
                    c.seller?.name,
                    c.cs?.name,
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();
                return hay.includes(q);
            });
        }

        return result;
    }, [searchTerm, companies, activeFilter]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => setCurrentPage(1), [searchTerm, activeFilter]);

    // ---------- actions ----------
    function openCreate() {
        resetForm();
        setShowModal(true);
    }

    function openEdit(company) {
        setCompanyToEdit(company);
        setIsEditing(true);

        const mf =
            Array.isArray(company.monthlyFees) && company.monthlyFees.length
                ? company.monthlyFees[0]
                : null;

        setForm({
            name: company.name || '',
            responsible: company.responsible || '',
            email: company.email || '',
            website: company.website || '',
            phone: company.phone || '',
            whatsapp: company.whatsapp || '',
            address: company.address || '',
            city: company.city || '',
            state: company.state || '',
            zipCode: company.zipCode || '',
            cnpj: company.cnpj || '',
            notes: company.notes || '',
            sellerId: company.seller?.id || '',
            csId: company.cs?.id || '',
            hasMonthlyFee: !!mf,
            monthlyFeeAmount: mf
                ? (mf.amountCents / 100).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                  })
                : '',
            dueDay: mf?.dueDay ?? '', // <<-- preenche o dia
            contractUrl: company.contractUrl || '',
            contractFilename: company.contractFilename || '',
        });

        setContractFile(null);
        setShowModal(true);
    }

    async function onSave() {
        const missing = validate();
        console.log(missing, 'missing');
        if (missing) {
            toast.error(`Campo obrigatório: ${missing}`);
            return;
        }
        setLoading(true);

        try {
            console.log('🚀 Salvando empresa... isEditing:', isEditing);
            let uploaded = null;
            if (contractFile) {
                uploaded = await uploadContractToFirebase(
                    contractFile,
                    isEditing ? companyToEdit?.id : undefined
                );
            }

            const payload = {
                name: form.name,
                responsible: form.responsible || '',
                website: form.website || '',
                email: form.email || '',
                phone: form.phone || '',
                whatsapp: form.whatsapp || '',
                address: form.address || '',
                city: form.city || '',
                state: form.state || '',
                zipCode: form.zipCode || '',
                cnpj: form.cnpj || '',
                notes: form.notes || '',
                sellerId: form.sellerId ? Number(form.sellerId) : null,
                csId: form.csId ? Number(form.csId) : null,

                hasMonthlyFee: !!form.hasMonthlyFee,
                monthlyFeeAmountCents: form.monthlyFeeAmount
                    ? Math.round(
                          Number(
                              String(form.monthlyFeeAmount).replace(/\D/g, '')
                          ) || 0
                      )
                    : 0,
                dueDay: form.dueDay ? Number(form.dueDay) : null, // <<-- somente dia

                // contrato
                contractUrl:
                    uploaded?.url ??
                    (isEditing ? form.contractUrl || null : null),
                contractFilename:
                    uploaded?.filename ??
                    (isEditing ? form.contractFilename || null : null),
            };

            const saved = isEditing
                ? await updateCompany(companyToEdit.id, payload) // Company
                : await createCompany(payload); // {message, company}

            const savedCompany = saved?.company ?? saved;

            setCompanies((prev) =>
                isEditing
                    ? prev.map((c) =>
                          c.id === companyToEdit.id ? savedCompany : c
                      )
                    : [...prev, savedCompany]
            );

            toast.success(
                isEditing
                    ? 'Empresa atualizada com sucesso!'
                    : 'Empresa criada com sucesso!'
            );

            closeModal();
        } catch (e) {
            toast.error(e.message || 'Erro ao salvar');
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function onDelete(company) {
        if (!confirm(`Excluir "${company.name}"?`)) return;
        try {
            await deleteCompany(company.id);
            setCompanies((p) => p.filter((c) => c.id !== company.id));
            toast.success('Empresa excluída com sucesso!');
        } catch (e) {
            toast.error(e.message || 'Erro ao excluir empresa');
        }
    }

    function closeModal() {
        resetForm();
        setShowModal(false);
    }

    // drawer controls
    function openDrawer(company) {
        setSelectedCompany(company);
        setShowDrawer(true);
    }
    function closeDrawer() {
        setSelectedCompany(null);
        setShowDrawer(false);
    }

    // ---------- expose ----------
    return {
        // state
        companies,
        users,
        searchTerm,
        setSearchTerm,
        activeFilter,
        setActiveFilter,
        currentItems,
        currentPage,
        setCurrentPage,
        totalPages,
        indexOfFirstItem,
        indexOfLastItem,
        filtered,

        // modal/form
        showModal,
        isEditing,
        loading,
        form,
        setForm,
        companyToEdit,
        contractFile,
        setContractFile,
        monthlySectionRef,
        monthlyAmountRef,

        // drawer
        showDrawer,
        selectedCompany,
        openDrawer,
        closeDrawer,

        // actions
        openCreate,
        openEdit,
        onSave,
        onDelete,
        closeModal,

        // helpers
        formatCurrencyInputBRL,
    };
}
