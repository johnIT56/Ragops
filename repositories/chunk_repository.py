from sqlalchemy.orm import Session

from models.chunk import Chunk


class ChunkRepository:

    def create_many(
        self,
        db: Session,
        document_id,
        chunks,
        embeddings,
    ):
        objects = []

        for idx, (text, vector) in enumerate(zip(chunks, embeddings)):
            objects.append(
                Chunk(
                    document_id=document_id,
                    chunk_index=idx,
                    content=text,
                    embedding=vector,
                )
            )

        db.add_all(objects)
        db.commit()

        return objects

    def find_similar(
        self,
        db: Session,
        embedding: list[float],
        top_k: int = 5,
    ):
        return (
            db.query(Chunk)
            .order_by(
                Chunk.embedding.cosine_distance(embedding)
            )
            .limit(top_k)
            .all()
        )