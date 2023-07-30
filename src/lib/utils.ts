export const serializeNonPOJOs = (obj: object) => {
    return structuredClone(obj);
}

export const getImageURL = (collectionId: string, recordId: string, filename: string, size = '0x0') => {
    return `${import.meta.env.VITE_PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${filename}?thumb=${size}`;
}