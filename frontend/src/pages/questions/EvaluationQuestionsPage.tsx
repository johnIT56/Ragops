import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getQuestionsByExperiment,
    deleteQuestion,
    type EvaluationQuestion,
} from "../../api/questions";

import CreateQuestionModal from "../../components/CreateQuestionModal";

export default function EvaluationQuestionsPage() {

    const { experimentId } = useParams();

    const [questions, setQuestions] =
        useState<EvaluationQuestion[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [showModal, setShowModal] =
        useState(false);

    const loadQuestions = async () => {

        if (!experimentId)
            return;

        try {

            const data =
                await getQuestionsByExperiment(
                    experimentId
                );

            setQuestions(data);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadQuestions();

    }, [experimentId]);

    const handleDelete = async (
        id: string,
    ) => {

        const confirmed =
            window.confirm(
                "Delete this question?"
            );

        if (!confirmed)
            return;

        await deleteQuestion(id);

        loadQuestions();

    };

    return (

        <DashboardLayout>

            <div className="flex items-center justify-between mb-8">

                <h1 className="text-3xl font-bold">

                    Evaluation Questions

                </h1>

                <button
                    onClick={() =>
                        setShowModal(true)
                    }
                    className="
                        rounded-lg
                        bg-blue-600
                        px-4
                        py-2
                        text-white
                        hover:bg-blue-700
                    "
                >

                    Add Question

                </button>

            </div>

            {loading ? (

                <p>Loading...</p>

            ) : questions.length === 0 ? (

                <div
                    className="
                        rounded-xl
                        bg-white
                        p-8
                        shadow
                        text-center
                    "
                >

                    No evaluation questions yet.

                </div>

            ) : (

                <div className="space-y-6">

                    {questions.map((question) => (

                        <div
                            key={question.id}
                            className="
                                rounded-xl
                                bg-white
                                p-6
                                shadow
                            "
                        >

                            <h2 className="font-semibold">

                                Question

                            </h2>

                            <p className="mt-2 whitespace-pre-wrap">

                                {question.question}

                            </p>

                            <h2 className="font-semibold mt-6">

                                Ground Truth

                            </h2>

                            <p className="mt-2 whitespace-pre-wrap">

                                {question.ground_truth}

                            </p>

                            <div className="mt-6 flex gap-3">

                                <button
                                    className="
                                        rounded-lg
                                        border
                                        px-4
                                        py-2
                                    "
                                >

                                    Edit

                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            question.id
                                        )
                                    }
                                    className="
                                        rounded-lg
                                        bg-red-600
                                        px-4
                                        py-2
                                        text-white
                                    "
                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

            <CreateQuestionModal
                open={showModal}
                experimentId={
                    experimentId!
                }
                onClose={() =>
                    setShowModal(false)
                }
                onCreated={loadQuestions}
            />

        </DashboardLayout>

    );

}