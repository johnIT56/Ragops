from langchain_community.document_loaders import PyPDFLoader


def load_pdf(path: str):

    loader = PyPDFLoader(path)

    docs = loader.load()

    return "\n".join(
        doc.page_content
        for doc in docs
    )