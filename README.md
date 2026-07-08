# RAGOps – Retrieval-Augmented Generation Evaluation Platform

RAGOps is a backend platform for building, evaluating, and comparing Retrieval-Augmented Generation (RAG) systems. It provides document ingestion, vector search, LLM-powered question answering, automated evaluation, and experiment tracking through a REST API built with FastAPI.

## 🚀 Features

* 📄 Upload and process PDF documents
* ✂️ Automatic document chunking
* 🧠 OpenAI embedding generation
* 🗄️ PostgreSQL + pgvector vector storage
* 🔍 Semantic similarity search
* 🤖 LLM-powered answer generation
* 🧪 Experiment management
* ❓ Evaluation question management
* 📊 Automated RAG evaluation
* 📈 Experiment run tracking
* 💾 Metrics persistence
* 🔄 Alembic database migrations
* 🌐 RESTful API with interactive Swagger documentation

---

# 🛠️ Tech Stack

### Backend

* FastAPI
* SQLAlchemy 2.0
* PostgreSQL
* pgvector
* Alembic

### AI

* OpenAI
* LangChain

### Document Processing

* PyPDF
* Recursive Character Text Splitter
* Tiktoken

### Infrastructure

* Docker
* Docker Compose

---

# 📂 Project Structure

```text
app/
│
├── api/
│   ├── chat.py
│   ├── documents.py
│   ├── experiments.py
│   └── questions.py
│
├── core/
│
├── models/
│
├── repositories/
│
├── schemas/
│
├── services/
│
├── migrations/
│
└── main.py
```

The project follows a layered architecture:

```text
API
 ↓
Services
 ↓
Repositories
 ↓
Database
```

---

# ⚙️ Evaluation Pipeline

```text
Upload PDF
      ↓
Extract Text
      ↓
Chunk Document
      ↓
Generate Embeddings
      ↓
Store in PostgreSQL + pgvector
      ↓
Retrieve Relevant Chunks
      ↓
Generate Answer
      ↓
Evaluate Response
      ↓
Store Question Results
      ↓
Aggregate Metrics
      ↓
Store Experiment Run
```

---

# 📊 Evaluation Metrics

Each experiment is evaluated using the following metrics:

* Answer Relevancy
* Faithfulness
* Context Precision
* Context Recall
* Latency

Average metrics are calculated and stored for every experiment run.

---

# 📡 API Endpoints

## Documents

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| POST   | `/documents/upload` | Upload and index a PDF document |

---

## Chat

| Method | Endpoint | Description                           |
| ------ | -------- | ------------------------------------- |
| POST   | `/chat`  | Ask questions using indexed documents |

---

## Experiments

| Method | Endpoint                           | Description           |
| ------ | ---------------------------------- | --------------------- |
| POST   | `/experiments`                     | Create an experiment  |
| GET    | `/experiments`                     | List all experiments  |
| POST   | `/experiments/{experiment_id}/run` | Execute an experiment |

---

## Evaluation Questions

| Method | Endpoint                                   | Description                     |
| ------ | ------------------------------------------ | ------------------------------- |
| POST   | `/questions`                               | Create an evaluation question   |
| GET    | `/questions/by-experiment/{experiment_id}` | Get questions for an experiment |

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/ragops.git
cd ragops
```

---

## 2. Configure Environment Variables

Create a `.env` file in the project root.

```env
OPENAI_API_KEY=your_openai_api_key

DATABASE_URL=postgresql+psycopg://postgres:password@postgres:5432/ragops

OPENAI_EMBEDDING_MODEL=text-embedding-3-small
OPENAI_CHAT_MODEL=gpt-4.1-mini
```

---

## 3. Start the Application

```bash
docker compose up --build
```

---

## 4. Apply Database Migrations

```bash
docker compose exec fastapi alembic upgrade head
```

---

## 5. Open Swagger UI

```
http://localhost:8000/docs
```

---

# 📝 Example Workflow

1. Upload a PDF document.
2. Ask questions using the chat endpoint.
3. Create an experiment.
4. Add evaluation questions.
5. Execute the experiment.
6. View stored evaluation metrics and experiment results.

---

# 🗺️ Roadmap

* [x] Document upload and indexing
* [x] Semantic search using pgvector
* [x] LLM-powered question answering
* [x] Experiment management
* [x] Evaluation question management
* [x] Automated RAG evaluation
* [x] Experiment run tracking
* [x] Experiment history
* [x] Run comparison
* [x] Evaluation dashboard
* [ ] Background workers
* [ ] Authentication
* [ ] Frontend (React/Next.js)
* [ ] CI/CD pipeline
* [ ] Cloud deployment

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Built with ❤️ using **FastAPI**, **PostgreSQL**, **pgvector**, **LangChain**, and **OpenAI**.
