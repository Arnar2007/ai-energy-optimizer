import { useEffect, useState } from "react";
import { getStats, uploadEnergyCsv } from "../services/api";
import StatsCards from "../components/StatsCards";
import EnergyChart from "../components/EnergyChart";
import AICoach from "../components/AICoach";
import UploadButton from "../components/UploadButton";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getStats()
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  async function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const data = await uploadEnergyCsv(file);
      setStats(data);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  }

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
            <UploadButton onUpload={handleUpload} uploading={uploading} />
            <button className="secondary">Ask AI Coach</button>
          </div>
        </div>

        <div className="hero-card">
          <p>Estimated yearly savings</p>
          <h2>18,500 ISK</h2>
          <span>Based on current usage patterns</span>
        </div>
      </section>

      <StatsCards stats={stats} />

      <section className="grid">
        <EnergyChart data={stats.daily_usage} />
        <AICoach tip={stats.ai_tip} />
      </section>
    </main>
  );
}

export default Dashboard;