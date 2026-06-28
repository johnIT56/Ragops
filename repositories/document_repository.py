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