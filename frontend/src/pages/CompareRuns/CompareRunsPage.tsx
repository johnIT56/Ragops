import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getRuns,
    type ExperimentRun,
} from "../../api/runs";

import RunSelector from "../../components/RunSelector";
import ComparisonTable from "../../components/ComparisonTable";

export default function CompareRunsPage() {

    const { experimentId } = useParams();

    const [runs, setRuns] =
        useState<ExperimentRun[]>([]);

    const [leftId, setLeftId] =
        useState("");

    const [rightId, setRightId] =
        useState("");

    useEffect(() => {

        if (!experimentId)
            return;

        getRuns(experimentId)
            .then(setRuns);

    }, [experimentId]);

    const leftRun =
        runs.find(r => r.id === leftId);

    const rightRun =
        runs.find(r => r.id === rightId);

    return (

        <DashboardLayout>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Compare Runs

                </h1>

                <p className="mt-2 text-gray-500">

                    Compare two experiment runs side by side.

                </p>

            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">

                <RunSelector
                    label="Run A"
                    runs={runs}
                    value={leftId}
                    onChange={setLeftId}
                />

                <RunSelector
                    label="Run B"
                    runs={runs}
                    value={rightId}
                    onChange={setRightId}
                />

            </div>

            <ComparisonTable
                left={leftRun}
                right={rightRun}
            />

        </DashboardLayout>

    );

}