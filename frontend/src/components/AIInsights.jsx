function AIInsights({ insights }) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-yellow-400">
          🧠 AI Insights
        </p>
  
        <h2 className="mt-2 text-2xl font-bold text-white">
          Recommendations for you
        </h2>
  
        <div className="mt-6 space-y-4">
          {insights?.map((insight, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-slate-200"
            >
              {insight}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default AIInsights;