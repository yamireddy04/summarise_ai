import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* Landing page FIRST */}
        <Route path="/" element={<Landing />} />

        {/* Dashboard */}
        <Route path="/app" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
