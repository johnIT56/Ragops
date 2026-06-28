from openai import OpenAI

from core.config import settings


class GenerationService:

    def __init__(
        self,
        model: str = "gpt-4.1-mini",
    ):
        self.model = model

        self.client = OpenAI(
            api_key=settings.OPENAI_API_KEY,
        )

    def generate(
        self,
        question: str,
        context: str,
    ) -> str:

        prompt = f"""
Answer ONLY using the provided context.

Context:

{context}

Question:

{question}
"""

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        return response.choices[0].message.content