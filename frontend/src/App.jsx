import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function App() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return <h1>Loading energy data...</h1>;

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>⚡ AI Energy Optimizer</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <h2>Average Usage</h2>
          <p>{stats.average_usage} kWh</p>
        </div>

        <div>
          <h2>Max Usage</h2>
          <p>{stats.max_usage} kWh</p>
        </div>

        <div>
          <h2>Total Usage</h2>
          <p>{stats.total_usage} kWh</p>
        </div>
      </div>

      <h2>Daily Energy Usage</h2>

      <LineChart width={700} height={300} data={stats.daily_usage}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="usage_kwh" />
      </LineChart>
    </div>
  );
}

export default App;