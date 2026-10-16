import '@fortawesome/fontawesome-free/css/all.min.css';
import { getServerSession } from 'next-auth';
import { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CompaniesHeader from '../../../components/CompaniesHeader';
import CompaniesTable from '../../../components/CompaniesTable';
import CompanyDrawer from '../../../components/CompanyDrawer';
import CompanyModal from '../../../components/CompanyModal';
import { useCompaniesPage } from '../../../hooks/useCompaniesPage';
import Pageheader from '../../../shared/layout-components/pageheader/pageheader';
import Seo from '../../../shared/layout-components/seo/seo';

import { getAllCompanies } from '@/pages/api/server/db/companies/getAllCompanies';
import { getAllUsers } from '@/pages/api/server/db/users/getAllUsers';

export default function CompaniesPage({ initialCompanies, users }) {
    const [lpsProfile, setLpsProfile] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('lps_profile') || 'GROWTH';
        }
        return 'GROWTH';
    });

    const handleLpsProfileChange = (profile) => {
        setLpsProfile(profile);
        if (typeof window !== 'undefined') {
            localStorage.setItem('lps_profile', profile);
        }
    };

    const ctx = useCompaniesPage(initialCompanies, users);
    const {
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
        openCreate,
        isEditing,
        onDelete,
        onSave,
        openEdit,
        showModal,
        closeModal,
        loading,
        form,
        setForm,
        users: usersCtx,
        contractFile,
        setContractFile,
        monthlySectionRef,
        monthlyAmountRef,
        showDrawer,
        selectedCompany,
        openDrawer,
        closeDrawer,
    } = ctx;

    return (
        <div>
            <Seo title={'Empresas'} />
            <Pageheader title="EMPRESAS" heading="Empresas" active="Empresas" />

            <Row className="row-sm">
                <Col xl={12} lg={12} md={12} style={{ width: '100%' }}>
                    <Card.Body className="p-2">
                        <CompaniesHeader
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onCreate={openCreate}
                            isEditing={isEditing}
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                            lpsProfile={lpsProfile}
                            onLpsProfileChange={handleLpsProfileChange}
                        />
                    </Card.Body>

                    <CompaniesTable
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        currentItems={currentItems}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        indexOfFirstItem={indexOfFirstItem}
                        indexOfLastItem={indexOfLastItem}
                        totalResults={filtered.length}
                        onEdit={openEdit}
                        onDelete={onDelete}
                        openDrawer={openDrawer}
                        lpsProfile={lpsProfile}
                    />
                </Col>
            </Row>

            <CompanyModal
                show={showModal}
                onHide={closeModal}
                isEditing={isEditing}
                loading={loading}
                form={form}
                setForm={setForm}
                users={usersCtx}
                contractFile={contractFile}
                setContractFile={setContractFile}
                monthlySectionRef={monthlySectionRef}
                monthlyAmountRef={monthlyAmountRef}
                onSave={onSave}
            />

            <CompanyDrawer
                show={showDrawer}
                onHide={closeDrawer}
                company={selectedCompany}
                onEdit={(c) => {
                    closeDrawer();
                    openEdit(c);
                }}
                onDelete={(c) => {
                    closeDrawer();
                    onDelete(c);
                }}
            />
        </div>
    );
}

export const getServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res);
    if (!session) return { redirect: { destination: '/', permanent: false } };
    const companiesRaw = await getAllCompanies();
    const users = await getAllUsers();
    const companies = JSON.parse(JSON.stringify(companiesRaw));
    return { props: { initialCompanies: companies, users } };
};

CompaniesPage.layout = 'Contentlayout';
