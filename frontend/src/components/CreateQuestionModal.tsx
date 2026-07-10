import { useState } from "react";

import {
    createQuestion,
} from "../api/questions";

interface Props {
    open: boolean;
    experimentId: string;
    onClose: () => void;
    onCreated: () => void;
}

export default function CreateQuestionModal({
    open,
    experimentId,
    onClose,
    onCreated,
}: Props) {

    const [loading, setLoading] =
        useState(false);

    const [question, setQuestion] =
        useState("");

    const [groundTruth, setGroundTruth] =
        useState("");

    if (!open)
        return null;

    const handleCreate = async () => {

        if (
            !question.trim() ||
            !groundTruth.trim()
        ) {

            alert(
                "Both fields are required."
            );

            return;

        }

        try {

            setLoading(true);

            await createQuestion({

                experiment_id: experimentId,

                question,

                ground_truth: groundTruth,

            });

            setQuestion("");
            setGroundTruth("");

            onCreated();

            onClose();

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div
                className="
                    w-full
                    max-w-2xl
                    rounded-xl
                    bg-white
                    p-8
                    shadow-xl
                "
            >

                <h2 className="text-2xl font-bold mb-6">

                    Add Evaluation Question

                </h2>

                <div className="space-y-5">

                    <div>

                        <label className="font-medium">

                            Question

                        </label>

                        <textarea
                            rows={4}
                            value={question}
                            onChange={(e) =>
                                setQuestion(
                                    e.target.value
                                )
                            }
                            className="
                                mt-2
                                w-full
                                rounded-lg
                                border
                                p-3
                            "
                        />

                    </div>

                    <div>

                        <label className="font-medium">

                            Ground Truth

                        </label>

                        <textarea
                            rows={6}
                            value={groundTruth}
                            onChange={(e) =>
                                setGroundTruth(
                                    e.target.value
                                )
                            }
                            className="
                                mt-2
                                w-full
                                rounded-lg
                                border
                                p-3
                            "
                        />

                    </div>

                </div>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="
                            rounded-lg
                            border
                            px-4
                            py-2
                        "
                    >

                        Cancel

                    </button>

                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="
                            rounded-lg
                            bg-blue-600
                            px-5
                            py-2
                            text-white
                        "
                    >

                        {loading
                            ? "Saving..."
                            : "Save Question"}

                    </button>

                </div>

            </div>

        </div>

    );

}