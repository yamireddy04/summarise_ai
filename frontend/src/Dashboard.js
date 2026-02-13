import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Dashboard() {

  const BACKEND = "http://localhost:8000";
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = useState("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const [contentType, setContentType] = useState("general");
  const [length, setLength] = useState("medium");
  const [format, setFormat] = useState("paragraph");

  const [summary, setSummary] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    axios.get(`${BACKEND}/history`)
      .then(res => setHistory(res.data))
      .catch(() => {});
  }, [summary]);

  const handleGenerate = async () => {

    setLoading(true);
    setSummary("");
    setFeedback("");

    try {

      let response;

      // ✅ TEXT VALIDATION (no UI change)
      if (tab === "text") {

        if (!text.trim()) {
          setSummary("Please paste some text first.");
          setLoading(false);
          return;
        }

        response = await axios.post(`${BACKEND}/summarize/text`, {
          text,
          contentType,
          length,
          format
        });
      }

      // ✅ PDF VALIDATION (no UI change)
      if (tab === "pdf") {

        if (!file) {
          setSummary("Please upload a PDF first.");
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("contentType", contentType);
        formData.append("length", length);
        formData.append("format", format);

        response = await axios.post(`${BACKEND}/summarize/pdf`, formData);
      }

      setSummary(response.data.summary);

    } catch (error) {

      if (error.response?.data?.error) {
        setSummary(error.response.data.error);
      } else {
        setSummary("Something went wrong.");
      }

    }

    setLoading(false);
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    setFeedback("Copied successfully ✅");
    setTimeout(() => setFeedback(""), 2000);
  };

  const downloadPDF = async (content) => {
    setFeedback("Downloading...");
    const response = await axios.post(
      `${BACKEND}/download/pdf`,
      { summary: content },
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "summary.pdf");
    document.body.appendChild(link);
    link.click();

    setTimeout(() => setFeedback(""), 2000);
  };

  const formattedSummary = (content) => {

    if (format === "bullets") {

      return content
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "" && line !== "•" && line !== "-")
        .map((line, i) => (
          <div key={i} style={{ marginBottom: "14px" }}>
            • {line.replace(/^[-•]\s*/, "")}
          </div>
        ));
    }

    return <div>{content}</div>;
  };

  const handleLeftArrow = () => {
    navigate("/");
  };

  const handleRightArrow = () => {
    if (location.pathname !== "/app") {
      navigate("/app");
    }
  };

  return (
    <div className="dashboard">

      <button className="arrow-btn arrow-left" onClick={handleLeftArrow}>
        ←
      </button>

      <button className="arrow-btn arrow-right" onClick={handleRightArrow}>
        →
      </button>

      <h1 className="dashboard-hero">AI Summariser</h1>

      <div className="tabs">
        <button
          className={tab==="text"?"active":""}
          onClick={()=>setTab("text")}
        >
          Text
        </button>

        <button
          className={tab==="pdf"?"active":""}
          onClick={()=>setTab("pdf")}
        >
          PDF
        </button>
      </div>

      <div className="controls">
        <select value={contentType} onChange={e => setContentType(e.target.value)}>
          <option value="general">General</option>
          <option value="academic">Academic</option>
          <option value="professional">Professional</option>
        </select>

        <select value={length} onChange={e => setLength(e.target.value)}>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>

        <select value={format} onChange={e => setFormat(e.target.value)}>
          <option value="paragraph">Paragraph</option>
          <option value="bullets">Bullet Points</option>
        </select>
      </div>

      {tab === "text" && (
        <textarea
          placeholder="Paste your text here..."
          onChange={e => setText(e.target.value)}
        />
      )}

      {tab === "pdf" && (
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setFile(e.target.files[0])}
        />
      )}

      <button className="gradient-btn" onClick={handleGenerate}>
        {loading ? "AI is summarising..." : "Generate Summary"}
      </button>

      {summary && (
        <div className="result">
          <h3>Summary</h3>

          <div className="summary-content">
            {formattedSummary(summary)}
          </div>

          <div className="result-buttons">
            <button className="small-btn" onClick={()=>copyToClipboard(summary)}>
              Copy
            </button>
            <button className="small-btn" onClick={()=>downloadPDF(summary)}>
              Download
            </button>
          </div>

          {feedback && <div className="feedback">{feedback}</div>}
        </div>
      )}

      <div className="history">
        <h3>History</h3>

        {history.map((item, index) => (
          <div
            key={index}
            className="history-item"
            onClick={()=>setSelectedHistory(item.summary)}
          >
            {item.summary}
          </div>
        ))}
      </div>

      {selectedHistory && (
        <div className="result">
          <h3>Previous Summary</h3>

          <div className="summary-content">
            {selectedHistory}
          </div>

          <div className="result-buttons">
            <button
              className="small-btn"
              onClick={()=>copyToClipboard(selectedHistory)}
            >
              Copy
            </button>

            <button
              className="small-btn"
              onClick={()=>downloadPDF(selectedHistory)}
            >
              Download
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;

