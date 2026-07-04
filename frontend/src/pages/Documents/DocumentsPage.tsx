import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getDocuments,
    deleteDocument,
    type Document,
} from "../../api/documents";

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    const loadDocuments = async () => {
        try {
            const data = await getDocuments();
            setDocuments(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmed) return;

        await deleteDocument(id);

        await loadDocuments();
    };

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">
                    Documents
                </h1>

                <button
                    className="
                        rounded-lg
                        bg-blue-600
                        px-4
                        py-2
                        text-white
                        hover:bg-blue-700
                    "
                >
                    Upload PDF
                </button>
            </div>

            {loading ? (
                <p>Loading documents...</p>
            ) : documents.length === 0 ? (
                <div className="rounded-xl bg-white p-8 text-center shadow">
                    <p className="text-gray-500">
                        No documents uploaded yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                bg-white
                                p-6
                                shadow
                            "
                        >
                            <div>
                                <h2 className="text-lg font-semibold">
                                    📄 {doc.filename}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {doc.file_type.toUpperCase()}
                                </p>

                                <p className="mt-1 text-sm text-gray-400">
                                    Uploaded{" "}
                                    {new Date(
                                        doc.uploaded_at
                                    ).toLocaleString()}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    handleDelete(doc.id)
                                }
                                className="
                                    rounded-lg
                                    bg-red-500
                                    px-4
                                    py-2
                                    text-white
                                    hover:bg-red-600
                                "
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}