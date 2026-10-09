// utils/firebaseUpload.js (ou o caminho equivalente)

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../shared/firebase/firebaseapi';

// JÁ EXISTENTE - usado nas empresas
export async function uploadContractToFirebase(file, companyId) {
    if (!file) return null;
    const safeName = file.name.replace(/\s+/g, '_');
    const key = companyId
        ? `contracts/${companyId}/${Date.now()}-${safeName}`
        : `contracts/${Date.now()}-${safeName}`;

    const storageRef = ref(storage, key);
    const snap = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snap.ref);
    return { url, filename: file.name, path: key };
}

// NOVO - genérico para tarefas, etc.
export async function uploadFileToFirebase(file, options = {}) {
    if (!file) return null;

    const { folder = 'uploads', entityId } = options;
    const safeName = file.name.replace(/\s+/g, '_');

    const baseFolder = entityId ? `${folder}/${entityId}` : folder;
    const key = `${baseFolder}/${Date.now()}-${safeName}`;

    const storageRef = ref(storage, key);
    const snap = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snap.ref);

    return {
        url,
        filename: file.name,
        path: key,
        mimeType: file.type ?? null,
    };
}
