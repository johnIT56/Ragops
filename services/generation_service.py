from openai import OpenAI

from core.config import settings


class GenerationService:

    def __init__(self):

        self.client = OpenAI(
            api_key=settings.OPENAI_API_KEY
        )

    def generate(
        self,
        question,
        context,
        model="gpt-4.1-mini",
    ):

        prompt = f"""
Answer only using the supplied context.

Context:

{context}

Question:

{question}
"""

        response = self.client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        return response.choices[0].message.content