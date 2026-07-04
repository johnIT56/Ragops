import api from "./axios";

export interface DashboardStats {
    documents: number;
    chunks: number;
    experiments: number;
    runs: number;
    questions: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>(
        "/dashboard/stats"
    );

    return response.data;
}