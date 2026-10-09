import { uploadFileToFirebase } from '@/utils/firebaseUpload';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const file = req.body.file;
        const folder = req.body.folder || 'tasks';

        const uploaded = await uploadFileToFirebase(file, folder);

        return res.status(200).json(uploaded);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Upload failed' });
    }
}
