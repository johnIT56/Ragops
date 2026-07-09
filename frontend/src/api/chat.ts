import api from "./axios";

export interface ChatResponse {
    answer: string;
    contexts: string[];
}

export async function askQuestion(
    question: string
): Promise<ChatResponse> {

    const response = await api.post(
        "/chat/ask",
        {
            question,
            top_k: 5,
        }
    );

    return response.data;
}