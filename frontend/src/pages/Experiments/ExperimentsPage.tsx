import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getExperiments,
    runExperiment,
    type Experiment,
} from "../../api/experiments";

import CreateExperimentModal from "../../components/CreateExperimentModal";
import ExperimentCard from "../../components/ExperimentCard";

export default function ExperimentsPage() {

    const [experiments, setExperiments] =
        useState<Experiment[]>([]);

    const [showCreateModal, setShowCreateModal] =
        useState(false);

    const loadExperiments = async () => {

        const data = await getExperiments();

        setExperiments(data);

    };

    useEffect(() => {

        loadExperiments();

    }, []);

    const handleRun = async (
        id: string,
    ) => {

        await runExperiment(id);

        alert("Experiment completed.");

    };

    const handleViewRuns = (
        id: string,
    ) => {

        // We'll implement this next.
        console.log("View runs:", id);

    };

    return (

        <DashboardLayout>

            <div className="flex items-center justify-between mb-8">

                <h1 className="text-3xl font-bold">

                    Experiments

                </h1>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="
                        rounded-lg
                        bg-blue-600
                        px-4
                        py-2
                        text-white
                        hover:bg-blue-700
                    "
                >

                    Create Experiment

                </button>

            </div>

            {experiments.length === 0 ? (

                <div
                    className="
                        rounded-xl
                        bg-white
                        p-8
                        text-center
                        shadow
                    "
                >

                    <p className="text-gray-500">

                        No experiments yet.

                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {experiments.map((experiment) => (

                        <ExperimentCard
                            key={experiment.id}
                            experiment={experiment}
                            onRun={handleRun}
                            onViewRuns={handleViewRuns}
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