function StatsCards({ stats }) {
    return (
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
    );
  }
  
  export default StatsCards;