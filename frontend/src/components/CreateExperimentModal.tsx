import { useState } from "react";

import {
    createExperiment,
    type ExperimentCreate,
} from "../api/experiments";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
}

export default function CreateExperimentModal({
    open,
    onClose,
    onCreated,
}: Props) {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<ExperimentCreate>({
        name: "",
        embedding_model: "text-embedding-3-small",
        llm_model: "gpt-4.1-mini",
        top_k: 5,
        temperature: 0,
        chunk_size: 1000,
        chunk_overlap: 200,
    });

    if (!open) return null;

    const handleCreate = async () => {

        if (!form.name.trim()) {
            alert("Experiment name is required.");
            return;
        }

        try {

            setLoading(true);

            await createExperiment(form);

            onCreated();

            onClose();

            setForm({
                name: "",
                embedding_model: "text-embedding-3-small",
                llm_model: "gpt-4.1-mini",
                top_k: 5,
                temperature: 0,
                chunk_size: 1000,
                chunk_overlap: 200,
            });

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-xl">

                <h2 className="mb-6 text-2xl font-bold">
                    Create Experiment
                </h2>

                <div className="space-y-4">

                    <input
                        placeholder="Experiment Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value,
                            })
                        }
                        className="w-full rounded border p-3"
                    />

                    <input
                        placeholder="Embedding Model"
                        value={form.embedding_model}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                embedding_model: e.target.value,
                            })
                        }
                        className="w-full rounded border p-3"
                    />

                    <input
                        placeholder="LLM Model"
                        value={form.llm_model}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                llm_model: e.target.value,
                            })
                        }
                        className="w-full rounded border p-3"
                    />

                    <input
                        type="number"
                        placeholder="Top K"
                        value={form.top_k}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                top_k: Number(e.target.value),
                            })
                        }
                        className="w-full rounded border p-3"
                    />

                    <input
                        type="number"
                        step="0.1"
                        placeholder="Temperature"
                        value={form.temperature}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                temperature: Number(e.target.value),
                            })
                        }
                        className="w-full rounded border p-3"
                    />

                    <input
                        type="number"
                        placeholder="Chunk Size"
                        value={form.chunk_size}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                chunk_size: Number(e.target.value),
                            })
                        }
                        className="w-full rounded border p-3"
                    />

                    <input
                        type="number"
                        placeholder="Chunk Overlap"
                        value={form.chunk_overlap}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                chunk_overlap: Number(e.target.value),
                            })
                        }
                        className="w-full rounded border p-3"
                    />

                </div>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="rounded border px-4 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>

                </div>

            </div>

        </div>

    );

}