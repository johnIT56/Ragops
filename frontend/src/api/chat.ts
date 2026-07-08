import api from "./axios";

export interface ChatResponse {
    answer: string;
    contexts: string[];
}

export async function askQuestion(
    question: string
): Promise<ChatResponse> {

    const response = await api.post(
        "/chat",
        {
            question,
        }
    );

    return response.data;
}