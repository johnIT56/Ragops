import api from "./axios";

export interface Document {
    id: string;
    filename: string;
    file_type: string;
    uploaded_at: string;
}

export async function getDocuments() {
    const response = await api.get<Document[]>("/documents");
    return response.data;
}

export async function deleteDocument(id: string) {
    await api.delete(`/documents/${id}`);
}