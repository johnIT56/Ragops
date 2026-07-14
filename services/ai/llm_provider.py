from langchain_openai import ChatOpenAI

from core.config import settings


class LLMProvider:

    def __init__(
        self,
        model: str | None = None,
        temperature: float = 0.0,
    ):

        self.model = ChatOpenAI(
            api_key=settings.OPENAI_API_KEY,
            model=model or settings.OPENAI_CHAT_MODEL,
            temperature=temperature,
        )

    def get(self) -> ChatOpenAI:

        return self.model