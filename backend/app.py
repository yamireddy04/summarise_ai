from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
import fitz
import os
import uuid

# Load environment variables
load_dotenv(dotenv_path=".env")

app = Flask(__name__)
# Update CORS to allow requests from your specific Vercel frontend URL in production
CORS(app)

# Retrieve the Groq API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Debugging: Confirm the key is loaded
print(f"DEBUG: GROQ_API_KEY loaded: {bool(GROQ_API_KEY)}")

# Initialize the Groq client
client = OpenAI(
    api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1",
)

history_store = []

def build_prompt(text, content_type, length, format_type):
    length_map = {
        "short": "Write a concise summary in 60-90 words.",
        "medium": "Write a clear summary in 120-180 words.",
        "long": "Write a detailed summary in 250-350 words."
    }
    tone_map = {
        "general": "Use clear and simple language.",
        "academic": "Use a formal academic tone.",
        "professional": "Use a professional tone."
    }
    format_map = {
        "paragraph": "Write in well-structured paragraphs.",
        "bullets": "Write in clear bullet points separated by line breaks. Do not use * symbols."
    }
    return f"""
{length_map.get(length)}
{tone_map.get(content_type)}
{format_map.get(format_type)}

If text is not in English, translate it to English first.

Content:
{text}

Return only the summary.
"""

def generate_summary(text, content_type, length, format_type):
    if len(text) > 6000:
        text = text[:6000]

    prompt = build_prompt(text, content_type, length, format_type)

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile", 
            messages=[
                {"role": "system", "content": "You are an expert AI summarizer. Never use markdown symbols like * or ** in output."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=600,
            temperature=0.3,
        )

        summary = response.choices[0].message.content.strip()
        summary = summary.replace("*", "").replace("•", "-")

        history_store.append({
            "id": str(uuid.uuid4()),
            "summary": summary[:200]
        })

        return summary

    except Exception as e:
        print(f"--- API DEBUG ERROR ---")
        print(f"Error Type: {type(e).__name__}")
        print(f"Error Details: {str(e)}")
        return "Error: Could not connect to AI service."

@app.route("/")
def home():
    return "AI Summariser Backend Running 🚀"

@app.route("/summarize/text", methods=["POST"])
def summarize_text():
    data = request.get_json() or {}
    text = data.get("text", "").strip()
    if not text:
        return jsonify({"error": "No text provided"}), 400
    summary = generate_summary(text, data.get("contentType"), data.get("length"), data.get("format"))
    return jsonify({"summary": summary})

@app.route("/summarize/pdf", methods=["POST"])
def summarize_pdf():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = "".join([page.get_text() for page in doc])
    if not text.strip():
        return jsonify({"error": "PDF contains no readable text"}), 400
    summary = generate_summary(text, request.form.get("contentType"), request.form.get("length"), request.form.get("format"))
    return jsonify({"summary": summary})

@app.route("/history", methods=["GET"])
def get_history():
    return jsonify(history_store[::-1])

@app.route("/download/pdf", methods=["POST"])
def download_pdf():
    data = request.get_json()
    summary_text = data.get("summary", "")
    if not summary_text.strip():
        return jsonify({"error": "No summary to download"}), 400
    file_path = f"summary_{uuid.uuid4()}.pdf"
    doc = SimpleDocTemplate(file_path)
    styles = getSampleStyleSheet()
    elements = [Paragraph(line, styles["Normal"]) for line in summary_text.split("\n")]
    doc.build(elements)
    return send_file(file_path, as_attachment=True)

if __name__ == "__main__":
    # Dynamically bind to the PORT provided by the platform (like Render), fallback to 8000
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)