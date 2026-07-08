import type { ExperimentRun } from "../api/runs";

interface Props {

    left?: ExperimentRun;

    right?: ExperimentRun;

}

export default function ComparisonTable({
    left,
    right,
}: Props) {

    if (!left || !right)
        return null;

    const rows = [

        {
            label: "Faithfulness",
            left: left.avg_faithfulness,
            right: right.avg_faithfulness,
            higher: true,
        },

        {
            label: "Answer Relevancy",
            left: left.avg_answer_relevancy,
            right: right.avg_answer_relevancy,
            higher: true,
        },

        {
            label: "Context Precision",
            left: left.avg_context_precision,
            right: right.avg_context_precision,
            higher: true,
        },

        {
            label: "Context Recall",
            left: left.avg_context_recall,
            right: right.avg_context_recall,
            higher: true,
        },

        {
            label: "Latency (s)",
            left: left.avg_latency,
            right: right.avg_latency,
            higher: false,
        },

    ];

    return (

        <table className="w-full rounded-xl bg-white shadow">

            <thead>

                <tr className="border-b">

                    <th className="p-4 text-left">

                        Metric

                    </th>

                    <th>

                        Run A

                    </th>

                    <th>

                        Run B

                    </th>

                </tr>

            </thead>

            <tbody>

                {rows.map((row) => {

                    const leftBetter = row.higher
                        ? row.left > row.right
                        : row.left < row.right;

                    return (

                        <tr
                            key={row.label}
                            className="border-b"
                        >

                            <td className="p-4">

                                {row.label}

                            </td>

                            <td
                                className={
                                    leftBetter
                                        ? "font-bold text-green-600"
                                        : ""
                                }
                            >

                                {row.left.toFixed(3)}

                            </td>

                            <td
                                className={
                                    !leftBetter
                                        ? "font-bold text-green-600"
                                        : ""
                                }
                            >

                                {row.right.toFixed(3)}

                            </td>

                        </tr>

                    );

                })}

            </tbody>

        </table>

    );

}