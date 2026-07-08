import type { Experiment } from "../api/experiments";

interface Props {
    experiment: Experiment;
    onRun: (id: string) => void;
    onViewRuns: (id: string) => void;
    onCompare: (id: string) => void;
}

export default function ExperimentCard({
    experiment,
    onRun,
    onViewRuns,
    onCompare,
}: Props) {

    return (

        <div
            className="
                rounded-xl
                bg-white
                p-6
                shadow
            "
        >

            <div className="flex justify-between">

                <div>

                    <h2 className="text-xl font-semibold">

                        {experiment.name}

                    </h2>

                    <div className="mt-4 space-y-1 text-gray-500">

                        <p>

                            LLM:
                            {" "}
                            {experiment.config.llm_model}

                        </p>

                        <p>

                            Embedding:
                            {" "}
                            {experiment.config.embedding_model}

                        </p>

                        <p>

                            Top K:
                            {" "}
                            {experiment.config.top_k}

                        </p>

                        <p>

                            Temperature:
                            {" "}
                            {experiment.config.temperature}

                        </p>

                    </div>

                </div>

                <div className="flex flex-col gap-3">

                    <button
                        onClick={() =>
                            onRun(experiment.id)
                        }
                        className="
                            rounded-lg
                            bg-green-600
                            px-4
                            py-2
                            text-white
                        "
                    >

                        ▶ Run

                    </button>

                    <button
                        onClick={() =>
                            onViewRuns(
                                experiment.id
                            )
                        }
                        className="
                            rounded-lg
                            border
                            px-4
                            py-2
                        "
                    >

                        View Runs

                    </button>

                    <button
                        onClick={() =>
                            onCompare(experiment.id)
                        }
                        className="
                            rounded-lg
                            bg-indigo-600
                            px-4
                            py-2
                            text-white
                            hover:bg-indigo-700
                        "
                    >

                        Compare Runs

                    </button>

                </div>

            </div>

        </div>

    );

}