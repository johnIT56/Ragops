from sqlalchemy.orm import Session

from models.document import Document


class DocumentRepository:

    def create(
        self,
        db: Session,
        filename: str,
        file_type: str,
    ) -> Document:

        document = Document(
            filename=filename,
            file_type=file_type,
        )

        db.add(document)
        db.commit()
        db.refresh(document)

        return document
    
    def list(
        self,
        db: Session,
    ) -> list[Document]:

        return (
            db.query(Document)
            .order_by(Document.uploaded_at.desc())
            .all()
        )

    def get_by_id(
        self,
        db: Session,
        document_id,
    ) -> Document | None:

        return (
            db.query(Document)
            .filter(Document.id == document_id)
            .first()
        )

    def delete(
        self,
        db: Session,
        document: Document,
    ):

        db.delete(document)
        