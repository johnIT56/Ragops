import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getExperiments,
    runExperiment,
    type Experiment,
} from "../../api/experiments";

import ExperimentCard from "../../components/ExperimentCard";
import CreateExperimentModal from "../../components/CreateExperimentModal";

import axios from "../../api/axios";


export default function ExperimentsPage() {

    const navigate = useNavigate();

    const [experiments, setExperiments] =
        useState<Experiment[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [showCreateModal, setShowCreateModal] =
        useState(false);

    const loadExperiments = async () => {

        try {

            const data =
                await getExperiments();

            setExperiments(data);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadExperiments();

    }, []);

    const handleRun = async (
        id: string,
    ) => {

        try {

            await runExperiment(id);

            alert("Experiment completed successfully.");

        } catch (error) {

            console.error(error)

            if (axios.isAxiosError(error)) {

                alert(
                    error.response?.data?.detail ??
                   "Failed to run experiment.");
        } else {

                alert(
                    "Failed to run experiment."
                );
            }

            }

        };

    const handleViewRuns = (
        id: string,
    ) => {

        navigate(
            `/experiments/${id}/runs`
        );

    };

    const handleCompare = (
        id: string,
    ) => {

        navigate(
            `/experiments/${id}/compare`
        );

    };

    const handleQuestions = (
        id: string,
    ) => {

        navigate(
            `/experiments/${id}/questions`
        );

    };

    return (

        <DashboardLayout>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Experiments

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Configure, run, and evaluate your RAG experiments.

                    </p>

                </div>

                <button
                    onClick={() =>
                        setShowCreateModal(true)
                    }
                    className="
                        rounded-lg
                        bg-blue-600
                        px-5
                        py-2.5
                        text-white
                        transition
                        hover:bg-blue-700
                    "
                >

                    + Create Experiment

                </button>

            </div>

            {loading ? (

                <div
                    className="
                        rounded-xl
                        bg-white
                        p-10
                        text-center
                        shadow
                    "
                >

                    Loading experiments...

                </div>

            ) : experiments.length === 0 ? (

                <div
                    className="
                        rounded-xl
                        bg-white
                        p-10
                        text-center
                        shadow
                    "
                >

                    <h2 className="text-xl font-semibold">

                        No Experiments Yet

                    </h2>

                    <p className="mt-2 text-gray-500">

                        Create your first experiment to start evaluating your RAG pipeline.

                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {experiments.map((experiment) => (

                        <ExperimentCard
                            key={experiment.id}
                            experiment={experiment}
                            onRun={handleRun}
                            onQuestions={handleQuestions}
                            onViewRuns={handleViewRuns}
                            onCompare={handleCompare}
                        />

                    ))}

                </div>

            )}

            <CreateExperimentModal
                open={showCreateModal}
                onClose={() =>
                    setShowCreateModal(false)
                }
                onCreated={loadExperiments}
            />

        </DashboardLayout>

    );

}