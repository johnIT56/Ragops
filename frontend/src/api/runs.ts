import api from "./axios";

export interface ExperimentRun {

    id: string;

    experiment_id: string;

    avg_latency: number;

    avg_faithfulness: number;

    avg_answer_relevancy: number;

    avg_context_precision: number;

    avg_context_recall: number;

    created_at: string;

}

export async function getRuns(
    experimentId: string,
) {

    const response =
        await api.get<ExperimentRun[]>(
            `/experiments/${experimentId}/runs`
        );

    return response.data;

}