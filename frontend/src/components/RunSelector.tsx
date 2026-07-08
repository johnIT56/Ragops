import type { ExperimentRun } from "../api/runs";

interface Props {

    label: string;

    runs: ExperimentRun[];

    value?: string;

    onChange: (id: string) => void;

}

export default function RunSelector({
    label,
    runs,
    value,
    onChange,
}: Props) {

    return (

        <div>

            <label className="mb-2 block font-semibold">

                {label}

            </label>

            <select
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="
                    w-full
                    rounded-lg
                    border
                    p-3
                "
            >

                <option value="">

                    Select Run

                </option>

                {runs.map((run, index) => (

                    <option
                        key={run.id}
                        value={run.id}
                    >

                        Run #{index + 1}

                    </option>

                ))}

            </select>

        </div>

    );

}