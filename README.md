# 🚀 AI Text & PDF Summarizer

A full-stack AI-powered web application that generates high-quality summaries from raw text or uploaded PDF documents using transformer-based language models.

Built with **Flask (Python)** for the backend and **React** for the frontend.

---

## 1️⃣ Problem Statement

Long-form textual content such as research papers, reports, and articles is time-consuming to read and analyze. Users often need concise summaries to quickly extract key insights without processing the entire document.

This project builds an end-to-end AI system that enables users to generate structured summaries from:

* Raw pasted text
* Uploaded PDF documents

---

## 2️⃣ Why It Matters

With the rapid growth of digital documentation, efficient information compression is critical in:

* Academic research
* Business reporting
* Legal documentation
* Technical documentation workflows

Automated summarization improves productivity by reducing cognitive load and accelerating knowledge extraction.

This system demonstrates practical integration of modern NLP models into a deployable web application.

---

## 3️⃣ Dataset

This application does **not use a locally trained dataset**.

Instead:

* Text input is provided directly by users.
* PDF content is extracted using **PyMuPDF**.
* Summaries are generated using transformer models via the **Hugging Face Inference API**.

The summarization quality depends on the pretrained transformer model accessed through the API.

---

## 4️⃣ Methodology

The system follows this pipeline:

1. User uploads PDF or pastes raw text.
2. PDF text is extracted using PyMuPDF.
3. Text is sent to the Flask backend.
4. Backend sends request to Hugging Face Inference API.
5. Transformer model generates summary.
6. Summary is formatted (paragraph or bullet format).
7. Output is returned to frontend.
8. Optional: Summary exported as downloadable PDF.

This ensures clean separation between:

* Data ingestion
* Model inference
* Response formatting
* Frontend rendering

---

## 5️⃣ Model Architecture

The application uses:

* Pretrained transformer-based summarization models
* Accessed via Hugging Face Inference API

Architecture flow:

React Frontend
⬇
Axios API Request
⬇
Flask Backend
⬇
Hugging Face Transformer Model
⬇
Generated Summary
⬇
Response to Frontend

No local fine-tuning is performed in this version.

---

## 6️⃣ Results

The system successfully:

* Generates coherent summaries from long-form text
* Supports adjustable summary lengths (Short / Medium / Long)
* Provides output formatting options (Paragraph / Bullet Points)
* Enables summary download as formatted PDF
* Maintains summary history tracking

The deployed version is live and functional:

Frontend:
[https://summarise-ai.vercel.app/](https://summarise-ai.vercel.app/)

Backend:
[https://summarise-backend.onrender.com](https://summarise-backend.onrender.com)

---

## 7️⃣ Limitations

* Dependent on external Hugging Face API availability.
* No local model fine-tuning.
* No quantitative evaluation metrics implemented.
* Performance may vary depending on input length and model constraints.
* API rate limits may affect scalability.

---

## 8️⃣ Future Work

* Local transformer model hosting
* Fine-tuning models on domain-specific corpora
* Add evaluation metrics (ROUGE scoring)
* Implement caching for improved performance
* Add user authentication system
* Docker containerization
* Cloud scalability improvements (AWS / GCP)

---

## 9️⃣ How to Run

## 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```
HF_TOKEN=your_huggingface_access_token_here
```

⚠️ Do NOT push this file to GitHub.
Ensure `.env` is included in `.gitignore`.

---

## ▶️ Running the Project Locally

### 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/summariserai.git
cd summariserai
```

---

### 2️⃣ Backend Setup

```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Backend runs on:

```
http://localhost:8000
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 🛠 Tech Stack

## 🔹 Frontend

* React
* Axios
* CSS

## 🔹 Backend

* Flask
* Flask-CORS
* Hugging Face Inference API
* PyMuPDF
* ReportLab
* python-dotenv

---

## 🎓 Academic Value

This project demonstrates:

* Applied NLP system integration
* Transformer-based inference workflows
* Full-stack AI deployment
* RESTful backend design
* Secure environment variable handling
* PDF processing pipelines

It reflects the practical implementation of AI systems beyond theoretical coursework.

## Live Link
backend - https://summarise-backend.onrender.com
frontend - https://summarise-ai.vercel.app/
  
