class RagService:

    def __init__(self):

        self.retrieval = RetrievalService()

        self.generation = GenerationService()

    def ask(
        self,
        db,
        question,
    ):

        chunks = self.retrieval.retrieve_chunks(
            db,
            question,
        )

        context = "\n\n".join(chunks)

        answer = self.generation.generate(
            question,
            context,
        )

        return answer, chunks