# 🚀 AI Text & PDF Summarizer

![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Flask%20%7C%20Python%20%7C%20PyMuPDF-1b2e2b?style=flat-square)
![Model](https://img.shields.io/badge/Model-Transformer%20via%20Groq%20API-d9c5b2?style=flat-square)
![Export](https://img.shields.io/badge/Export-PDF%20via%20ReportLab-f5a623?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-7ecb84?style=flat-square)

A full-stack AI-powered web application that generates high-quality summaries from raw text or uploaded PDF documents using transformer-based language models.

Built with **Flask** (Python) for the backend and **React** for the frontend.

**Live Frontend:** https://summarise-ai.vercel.app/

**Live Backend:** https://summarise-backend.onrender.com

---

## 1️⃣ Problem Statement

Long-form textual content — research papers, business reports, legal documents, and technical articles — is time-consuming to read and analyze. Users frequently need concise summaries to extract key insights without processing entire documents.

This project builds an end-to-end AI system that enables users to generate structured, high-quality summaries from:

- Raw pasted text
- Uploaded PDF documents

---

## 2️⃣ Why It Matters

With the rapid growth of digital documentation, efficient information compression is critical across multiple domains:

- **Academic research:** Rapidly assessing relevance of papers before deep reading
- **Business reporting:** Condensing lengthy reports into executive-level insights
- **Legal documentation:** Extracting key clauses without full document review
- **Technical documentation:** Accelerating onboarding and knowledge transfer workflows

Automated summarization reduces cognitive load, accelerates knowledge extraction, and demonstrates practical integration of modern NLP models into a deployable, user-facing web application.

---

## 3️⃣ Dataset

This application does not use a locally trained dataset.

- Text input is provided directly by users at runtime.
- PDF content is extracted programmatically using **PyMuPDF**.
- Summaries are generated using pretrained transformer models accessed via the **Groq API**.

Summarization quality depends on the pretrained transformer model accessed through the API. No local fine-tuning is performed in this version.

---

## 4️⃣ Methodology

The system follows a clean, end-to-end pipeline:

1. User uploads a PDF or pastes raw text via the React frontend.
2. PDF text is extracted using PyMuPDF on the backend.
3. Cleaned text is sent to the Flask backend via Axios API request.
4. Backend forwards the request to the Groq API.
5. The transformer model generates the summary.
6. The summary is formatted into the selected output style (paragraph or bullet points).
7. The formatted summary is returned to the frontend for display.
8. Optionally, the user can download the summary as a formatted PDF.

```
User Input (PDF / Raw Text)
        │
        ▼
  [PDF Extraction — PyMuPDF]
        │
        ▼
  [Flask Backend]
  - Request construction
  - Groq API call
        │
        ▼
  [Transformer Model — Groq API]
  - Summary generation
        │
        ▼
  [Response Formatting]
  - Paragraph or bullet point output
  - Adjustable length (Short / Medium / Long)
        │
        ▼
  [React Frontend]
  - Summary display
  - History tracking
  - Optional PDF export (ReportLab)
```

---

## 5️⃣ Model Architecture

**Inference Pipeline**

| Component | Technology |
|---|---|
| Summarization Model | Pretrained transformer-based model |
| Model Access | Groq API |
| PDF Extraction | PyMuPDF |
| PDF Export | ReportLab |
| Backend | Flask, Flask-CORS |
| Frontend | React, Axios |

**Architecture Flow**

```
React Frontend
      │  Axios API Request
      ▼
Flask Backend
      │  Groq API Request
      ▼
Transformer Summarization Model
      │  Generated Summary
      ▼
Flask Backend
      │  Formatted Response
      ▼
React Frontend (Display + Optional Download)
```

No local model fine-tuning or custom training is performed. The system acts as a structured orchestration layer around a pretrained transformer endpoint.

---

## 6️⃣ Results

The system successfully delivers the following capabilities in production:

| Feature | Status |
|---|---|
| Raw text summarization | ✅ Functional |
| PDF upload and extraction | ✅ Functional |
| Adjustable summary length (Short / Medium / Long) | ✅ Functional |
| Output format selection (Paragraph / Bullet Points) | ✅ Functional |
| Summary download as PDF | ✅ Functional |
| Summary history tracking | ✅ Functional |

The deployed version is live and functional at the links above. Qualitative evaluation across various document types confirms coherent, well-structured summary generation.

> Quantitative evaluation metrics (e.g., ROUGE scoring) are planned as future work.

---

## 7️⃣ Limitations

- **External API Dependency:** System availability depends on Groq API uptime.
- **No Local Fine-Tuning:** The model is not fine-tuned on domain-specific corpora, which may limit performance on technical or specialized text.
- **No Quantitative Evaluation:** ROUGE scoring and benchmark evaluation are not yet implemented.
- **Input Length Constraints:** Performance may vary depending on input length relative to the model's context window limits.
- **API Rate Limits:** Throughput is constrained by Groq API rate limits, affecting scalability under high load.

---

## 8️⃣ Future Work

- Host transformer models locally to eliminate external API dependency
- Fine-tune models on domain-specific corpora (legal, medical, academic)
- Implement ROUGE scoring for quantitative summarization evaluation
- Add caching layer for repeated or similar inputs to improve response time
- Implement user authentication and personal summary history
- Containerize using Docker for consistent deployment across environments
- Scale backend infrastructure using AWS or GCP for production load

---

## 9️⃣ How to Run

**Environment Variables**

Create a `.env` file inside the `backend/` folder:

```
GROQ_API_KEY=your_groq_api_key_here
```

> ⚠️ Do NOT push this file to GitHub. Ensure `.env` is listed in `.gitignore`.

**1. Clone Repository**

```bash
git clone https://github.com/yourusername/summariserai.git
cd summariserai
```

**2. Backend Setup**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Backend runs on: `http://localhost:8000`

**3. Frontend Setup**

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🔟 Conclusion

This project demonstrates how pretrained transformer models can be integrated into a deployable, user-facing web application to solve a practical information-compression problem. By separating data ingestion, model inference, response formatting, and frontend rendering into distinct layers, the system achieves clean modularity and extensibility. The result is a functional, production-deployed summarization tool with a clear roadmap toward local model hosting, domain-specific fine-tuning, and quantitative evaluation — forming a strong foundation for more rigorous NLP application development.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Axios, CSS |
| Backend | Flask, Flask-CORS, python-dotenv |
| AI Inference | Groq API (Transformer models) |
| PDF Extraction | PyMuPDF |
| PDF Export | ReportLab |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
