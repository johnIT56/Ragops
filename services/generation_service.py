from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI

from core.config import settings


class GenerationService:

    def __init__(self):
        self.llm = ChatOpenAI(
            api_key=settings.OPENAI_API_KEY,
            model=settings.OPENAI_CHAT_MODEL,
            temperature=0,
        )

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