export async function createCompany(payload) {
    const res = await fetch('/api/server/db/company/createCompany', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Falha ao criar empresa');
    return data.company;
}

export async function updateCompany(id, payload) {
    const url = `/api/server/db/company/updateCompany?id=${id}`.replace(
        /\/+$/,
        ''
    );
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Falha ao atualizar empresa');
    return data.company;
}

export async function deleteCompany(id) {
    const res = await fetch(`/api/company/deleteCompany?id=${id}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Falha ao excluir empresa');
    return true;
}
