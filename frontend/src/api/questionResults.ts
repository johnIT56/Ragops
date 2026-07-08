import api from "./axios";

export interface QuestionResult {

    id: string;

    question: string;

    answer: string;

    contexts: string;

    latency: number;

    faithfulness: number;

    answer_relevancy: number;

    context_precision: number;

    context_recall: number;

}

export async function getRunResults(
    runId: string,
) {

    const response =
        await api.get<QuestionResult[]>(
            `/runs/${runId}/results`
        );

    return response.data;

}