import api from "./axios";

export interface Experiment {
    id: string;
    name: string;
    config: {
        embedding_model: string;
        llm_model: string;
        top_k: number;
        temperature: number;
        chunk_size: number;
        chunk_overlap: number;
    };
}

export interface ExperimentCreate {
    name: string;
    embedding_model: string;
    llm_model: string;
    top_k: number;
    temperature: number;
    chunk_size: number;
    chunk_overlap: number;
}

export async function getExperiments() {
    const response = await api.get<Experiment[]>("/experiments");
    return response.data;
}

export async function createExperiment(
    experiment: ExperimentCreate
) {

    const response = await api.post(
        "/experiments",
        {
            name: experiment.name,
            config: {
                embedding_model: experiment.embedding_model,
                llm_model: experiment.llm_model,
                top_k: experiment.top_k,
                temperature: experiment.temperature,
                chunk_size: experiment.chunk_size,
                chunk_overlap: experiment.chunk_overlap,
            },
        }
    );

    return response.data;

}

export async function runExperiment(id: string) {
    const response = await api.post(
        `/experiments/${id}/run`
    );

    return response.data;
}