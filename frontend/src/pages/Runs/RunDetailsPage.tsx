import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getRunResults,
    type QuestionResult,
} from "../../api/questionResults";

export default function RunDetailsPage() {

    const { runId } = useParams();

    const [results, setResults] =
        useState<QuestionResult[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (!runId)
            return;

        getRunResults(runId)
            .then(setResults)
            .finally(() => setLoading(false));

    }, [runId]);

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                Run Details

            </h1>

            {loading ? (

                <p>Loading...</p>

            ) : (

                <div className="space-y-8">

                    {results.map(result => (

                        <div
                            key={result.id}
                            className="rounded-xl bg-white p-6 shadow"
                        >

                            <Section
                                title="Question"
                                value={result.question}
                            />

                            <Section
                                title="Answer"
                                value={result.answer}
                            />

                            <Section
                                title="Retrieved Context"
                                value={result.contexts}
                            />

                            <div className="grid grid-cols-5 gap-6 mt-8">

                                <Metric
                                    title="Faithfulness"
                                    value={result.faithfulness}
                                />

                                <Metric
                                    title="Relevancy"
                                    value={result.answer_relevancy}
                                />

                                <Metric
                                    title="Precision"
                                    value={result.context_precision}
                                />

                                <Metric
                                    title="Recall"
                                    value={result.context_recall}
                                />

                                <Metric
                                    title="Latency"
                                    value={`${result.latency.toFixed(2)} s`}
                                />

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </DashboardLayout>

    );

}

function Section({
    title,
    value,
}: {
    title: string;
    value: string;
}) {

    return (

        <div className="mb-6">

            <h2 className="font-semibold mb-2">

                {title}

            </h2>

            <div className="rounded-lg bg-gray-50 p-4 whitespace-pre-wrap">

                {value}

            </div>

        </div>

    );

}

function Metric({
    title,
    value,
}: {
    title: string;
    value: string | number;
}) {

    return (

        <div>

            <p className="text-sm text-gray-500">

                {title}

            </p>

            <p className="text-xl font-bold">

                {value}

            </p>

        </div>

    );

}