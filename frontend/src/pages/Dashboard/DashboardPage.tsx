import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getDashboardStats,
    type DashboardStats,
} from "../../api/dashboard";

import StatCard from "../../components/StatCard";

export default function DashboardPage() {

    const [stats, setStats] =
        useState<DashboardStats>();

    useEffect(() => {

        getDashboardStats()
            .then(setStats);

    }, []);

    if (!stats)
        return (
            <DashboardLayout>

                Loading...

            </DashboardLayout>
        );

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold">
                Welcome 👋
            </h1>

            <p className="text-gray-500 mt-2 mb-8">
               Monitor your RAG experiments and evaluations.
            </p>

            <div className="grid grid-cols-3 gap-6">

                <StatCard
                    title="Documents"
                    value={stats.documents}
                />

                <StatCard
                    title="Chunks"
                    value={stats.chunks}
                />

                <StatCard
                    title="Experiments"
                    value={stats.experiments}
                />

                <StatCard
                    title="Runs"
                    value={stats.runs}
                />

                <StatCard
                    title="Questions"
                    value={stats.questions}
                />

            </div>

        </DashboardLayout>

    );

}

