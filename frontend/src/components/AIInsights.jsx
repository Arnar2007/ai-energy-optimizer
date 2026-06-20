function getInsightStyle(index) {
    const styles = [
      {
        label: "Peak usage",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/25",
      },
      {
        label: "Savings",
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/25",
      },
      {
        label: "Score",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/25",
      },
      {
        label: "Forecast",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/25",
      },
    ];
  
    return styles[index % styles.length];
  }
  
  function AIInsights({ insights }) {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-yellow-400">
              🧠 AI Insights
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              What VoltWise noticed
            </h2>
          </div>
  
          <span className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-400">
            Updated now
          </span>
        </div>
  
        <div className="grid gap-4 md:grid-cols-2">
          {insights?.map((insight, index) => {
            const style = getInsightStyle(index);
  
            return (
              <div
                key={index}
                className={`rounded-2xl border ${style.border} ${style.bg} p-5`}
              >
                <p className={`text-xs font-bold uppercase tracking-widest ${style.color}`}>
                  {style.label}
                </p>
  
                <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-100">
                  {insight}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  
  export default AIInsights;