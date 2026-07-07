import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getRuns,
    type ExperimentRun,
} from "../../api/runs";

export default function RunsPage() {

    const navigate = useNavigate();

    const { experimentId } = useParams();

    const [runs, setRuns] =
        useState<ExperimentRun[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (!experimentId)
            return;

        getRuns(experimentId)
            .then(setRuns)
            .finally(() =>
                setLoading(false)
            );

    }, [experimentId]);

    return (

        <DashboardLayout>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Experiment Runs

                </h1>

                <p className="mt-2 text-gray-500">

                    View previous experiment executions and their evaluation metrics.

                </p>

            </div>

            {loading ? (

                <div className="rounded-xl bg-white p-8 text-center shadow">

                    Loading runs...

                </div>

            ) : runs.length === 0 ? (

                <div className="rounded-xl bg-white p-8 text-center shadow">

                    <h2 className="text-xl font-semibold">

                        No Runs Yet

                    </h2>

                    <p className="mt-2 text-gray-500">

                        Run an experiment to generate evaluation results.

                    </p>

                </div>

            ) : (

                <div className="space-y-6">

                    {runs.map((run, index) => (

                        <div
                            key={run.id}
                            className="
                                rounded-xl
                                bg-white
                                p-6
                                shadow
                            "
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <h2 className="text-xl font-semibold">

                                        Run #{index + 1}

                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">

                                        {new Date(
                                            run.created_at
                                        ).toLocaleString()}

                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        navigate(`/runs/${run.id}`)
                                    }
                                    className="
                                        rounded-lg
                                        border
                                        px-4
                                        py-2
                                        transition
                                        hover:bg-gray-100
                                    "
                                >

                                    View Details

                                </button>

                            </div>

                            <div className="mt-8 grid grid-cols-5 gap-6">

                                <Metric
                                    title="Faithfulness"
                                    value={run.avg_faithfulness}
                                />

                                <Metric
                                    title="Relevancy"
                                    value={run.avg_answer_relevancy}
                                />

                                <Metric
                                    title="Precision"
                                    value={run.avg_context_precision}
                                />

                                <Metric
                                    title="Recall"
                                    value={run.avg_context_recall}
                                />

                                <Metric
                                    title="Latency"
                                    value={`${run.avg_latency.toFixed(2)} s`}
                                />

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </DashboardLayout>

    );

}

interface MetricProps {

    title: string;

    value: string | number;

}

function Metric({
    title,
    value,
}: MetricProps) {

    return (

        <div className="rounded-lg bg-gray-50 p-4">

            <p className="text-sm text-gray-500">

                {title}

            </p>

            <p className="mt-2 text-2xl font-bold">

                {value}

            </p>

        </div>

    );

}