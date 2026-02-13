import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

/* Move phrases OUTSIDE component */
const phrases = [
  "Turn Text into Summaries",
  "Turn PDFs into Summaries",
  "Turn Notes into Summaries",
  "Turn Anything into Summaries"
];

function Landing() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-new">

      <h1 className="brand-title">SummariseAI</h1>

      <p className="brand-tagline">
        Smart. Fast. No fluff.
      </p>

      <h2 key={index} className="dynamic-text">
        {phrases[index]}
      </h2>

      <button
        className="gradient-btn start-btn"
        onClick={() => navigate("/app")}
      >
        Start Summarising →
      </button>

    </div>
  );
}

export default Landing;
