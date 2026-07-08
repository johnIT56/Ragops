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

export async function uploadDocument(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    await api.post(
        "/documents/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
}