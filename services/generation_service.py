from langchain_core.messages import HumanMessage

from services.ai.llm_provider import LLMProvider


class GenerationService:

    def __init__(
        self,
        model: str | None = None,
        temperature: float = 0.0,
    ):

        provider = LLMProvider(
            model=model,
            temperature=temperature,
        )

        self.llm = provider.get()

    def generate(
        self,
        question: str,
        contexts: list[str],
    ) -> str:

        context = "\n\n".join(contexts)

        prompt = f"""
You are a helpful assistant.

Answer ONLY using the provided context.

Context:
{context}

Question:
{question}
"""

        response = self.llm.invoke(
            [HumanMessage(content=prompt)]
        )

        return response.content