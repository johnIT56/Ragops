import type { Experiment } from "../api/experiments";

interface Props {
    experiment: Experiment;
    runningId: string | null;
    onRun: (id: string) => void;
    onQuestions: (id: string) => void;
    onViewRuns: (id: string) => void;
    onCompare: (id: string) => void;
    
}

export default function ExperimentCard({
    experiment,
    runningId,
    onRun,
    onQuestions,
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
                        disabled={runningId === experiment.id}
                        onClick={() =>
                            onRun(experiment.id)
                        }
                        className="
                            rounded-lg
                            bg-green-600
                            px-4
                            py-2
                            text-white
                            disabled:bg-gray-400
                            disabled:cursor-not-allowed
                        "
                    >
                        {runningId === experiment.id
                            ? "Running..."
                            : "▶ Run"}
                    </button>
                        

                    <button
                        onClick={() =>
                            onQuestions(
                                experiment.id
                            )
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

                        Questions

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