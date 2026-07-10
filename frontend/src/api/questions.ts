import api from "./axios";

export interface EvaluationQuestion {
    id: string;
    experiment_id: string;
    question: string;
    ground_truth: string;
    created_at: string;
}

export interface EvaluationQuestionCreate {
    experiment_id: string;
    question: string;
    ground_truth: string;
}

export interface EvaluationQuestionUpdate {
    question: string;
    ground_truth: string;
}

export async function getQuestions() {
    const response = await api.get<EvaluationQuestion[]>(
        "/questions"
    );

    return response.data;
}

export async function getQuestionsByExperiment(
    experimentId: string
) {
    const response =
        await api.get<EvaluationQuestion[]>(
            `/questions/by-experiment/${experimentId}`
        );

    return response.data;
}

export async function createQuestion(
    payload: EvaluationQuestionCreate
) {
    const response = await api.post(
        "/questions",
        payload,
    );

    return response.data;
}

export async function updateQuestion(
    id: string,
    payload: EvaluationQuestionUpdate
) {
    const response = await api.put(
        `/questions/${id}`,
        payload,
    );

    return response.data;
}

export async function deleteQuestion(
    id: string
) {
    const response = await api.delete(
        `/questions/${id}`
    );

    return response.data;
}