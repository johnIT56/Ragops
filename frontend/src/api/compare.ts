import api from "./axios";
import type { ExperimentRun } from "./runs";

export async function getExperimentRuns(
    experimentId: string,
): Promise<ExperimentRun[]> {

    const response = await api.get<ExperimentRun[]>(
        `/experiments/${experimentId}/runs`
    );

    return response.data;

}