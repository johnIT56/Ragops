import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import QuestionResultCard from "../../components/QuestionResultCard";

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
            .finally(() =>
                setLoading(false)
            );

    }, [runId]);

    return (

        <DashboardLayout>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Run Details

                </h1>

                <p className="mt-2 text-gray-500">

                    Inspect every evaluated question, generated answer,
                    retrieved context, and evaluation metric.

                </p>

            </div>

            {loading ? (

                <div className="rounded-xl bg-white p-8 text-center shadow">

                    Loading results...

                </div>

            ) : results.length === 0 ? (

                <div className="rounded-xl bg-white p-8 text-center shadow">

                    <h2 className="text-xl font-semibold">

                        No Results Found

                    </h2>

                    <p className="mt-2 text-gray-500">

                        This run does not contain any evaluated questions.

                    </p>

                </div>

            ) : (

                <div className="space-y-6">

                    {results.map((result) => (

                        <QuestionResultCard
                            key={result.id}
                            result={result}
                        />

                    ))}

                </div>

            )}

        </DashboardLayout>

    );

}