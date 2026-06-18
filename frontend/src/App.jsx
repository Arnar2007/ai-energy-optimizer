import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

function App() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  if (!stats) {
    return <div className="loading">Loading VoltWise...</div>;
  }

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="badge">⚡ VoltWise AI</p>
          <h1>Your personal AI energy coach.</h1>
          <p className="subtitle">
            Understand your electricity usage, predict expensive habits, and
            discover smarter ways to reduce your bill.
          </p>

          <div className="hero-buttons">
            <button>Upload Energy Data</button>
            <button className="secondary">Ask AI Coach</button>
          </div>
        </div>

        <div className="hero-card">
          <p>Estimated yearly savings</p>
          <h2>18,500 ISK</h2>
          <span>Based on current usage patterns</span>
        </div>
      </section>

      <section className="cards">
        <div className="card">
          <p>Average usage</p>
          <h2>{stats.average_usage} kWh</h2>
        </div>

        <div className="card">
          <p>Peak usage</p>
          <h2>{stats.max_usage} kWh</h2>
        </div>

        <div className="card">
          <p>Total usage</p>
          <h2>{stats.total_usage} kWh</h2>
        </div>
      </section>

      <section className="grid">
        <div className="panel chart-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Energy analytics</p>
              <h2>Daily usage trend</h2>
            </div>
            <span className="status">Live data</span>
          </div>

          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={stats.daily_usage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#243044" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="usage_kwh"
                stroke="#22c55e"
                strokeWidth={4}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel coach-panel">
          <p className="eyebrow">AI Coach</p>
          <h2>Smart recommendation</h2>
          <p className="coach-text">{stats.ai_tip}</p>

          <div className="question-box">
            <p>Try asking later:</p>
            <span>“Why was my usage high this week?”</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;