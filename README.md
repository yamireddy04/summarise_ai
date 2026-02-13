# 🚀 AI Text & PDF Summarizer

A full-stack AI-powered web application that generates high-quality summaries from raw text or uploaded PDF documents using transformer-based language models.

Built with **Flask (Python)** for the backend and **React** for the frontend.

---

## ✨ Features

- 📄 Upload and summarize PDF documents  
- 📝 Paste and summarize raw text  
- 🤖 AI-generated summaries using Hugging Face transformer models  
- 📏 Adjustable summary length (Short / Medium / Long)  
- 📌 Output format options (Paragraph / Bullet Points)  
- 📥 Download summary as a formatted PDF  
- 🕒 Summary history tracking  
- 🎨 Clean and responsive user interface  

---

## 🛠 Tech Stack

### 🔹 Frontend
- React
- Axios
- CSS

### 🔹 Backend
- Flask
- Flask-CORS
- Hugging Face Inference API
- PyMuPDF (PDF text extraction)
- ReportLab (PDF generation)
- python-dotenv

---

## 🏗 System Architecture

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

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
HF_TOKEN=your_huggingface_access_token_here
```

⚠️ Do NOT push this file to GitHub.  
Ensure `.env` is listed inside `.gitignore`.

---

## 📂 Project Structure

```
summariserai/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env (not committed)
│
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│
├── .gitignore
└── README.md
```

---

## ▶️ Running the Project Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/summariserai.git
cd summariserai
```

---

### 2️⃣ Backend Setup

```bash
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

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🧠 Technical Highlights

- Integrated transformer-based NLP model via API  
- Implemented PDF text extraction pipeline  
- Generated structured downloadable PDF outputs  
- Designed RESTful backend architecture  
- Used environment-based secure token management  
- Maintained clean separation of frontend and backend  

---

## 🎓 Academic Value

This project demonstrates applied knowledge in:

- Natural Language Processing (NLP)  
- Transformer-based model inference  
- AI system integration  
- Full-stack application architecture  
- Secure API-based development  

It reflects real-world AI system implementation beyond theoretical coursework.

---

## 🔮 Future Enhancements

- Cloud deployment (Render / Railway / AWS)
- Frontend deployment (Vercel / Netlify)
- User authentication system
- Model fine-tuning support
- Docker containerization
- Performance optimization

---

## Live Link
backend - https://summarise-backend.onrender.com
frontend - https://summarise-ai.vercel.app/
  
