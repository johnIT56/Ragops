import type { QuestionResult } from "../api/questionResults";

interface Props {
    result: QuestionResult;
}

export default function QuestionResultCard({
    result,
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

            <Section
                title="Question"
                value={result.question}
            />

            <Section
                title="Generated Answer"
                value={result.answer}
            />

            <Section
                title="Retrieved Context"
                value={result.contexts}
            />

            <div className="mt-8 grid grid-cols-5 gap-4">

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

            <h3 className="mb-2 font-semibold">

                {title}

            </h3>

            <div
                className="
                    whitespace-pre-wrap
                    rounded-lg
                    bg-gray-50
                    p-4
                "
            >

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

        <div
            className="
                rounded-lg
                bg-gray-50
                p-4
                text-center
            "
        >

            <p className="text-sm text-gray-500">

                {title}

            </p>

            <p className="mt-2 text-xl font-bold">

                {value}

            </p>

        </div>

    );

}