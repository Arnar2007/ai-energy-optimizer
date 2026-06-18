import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
  } from "recharts";
  
  function EnergyChart({ data }) {
    return (
      <div className="panel chart-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Energy analytics</p>
            <h2>Daily usage trend</h2>
          </div>
          <span className="status">Live data</span>
        </div>
  
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={data}>
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
    );
  }
  
  export default EnergyChart;