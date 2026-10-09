export function toWaLink(phone, msg = '') {
    const d = (phone || '').replace(/\D/g, '');
    const encoded = encodeURIComponent(msg);
    return `https://wa.me/${d}?text=${encoded}`;
}
