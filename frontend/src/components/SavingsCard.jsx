function SavingsCard({ report }) {
    if (!report) return null;
  
    return (
      <section className="rounded-3xl border border-green-400/25 bg-green-400/10 p-6 shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-green-400">
          💰 Potential Savings
        </p>
  
        <h2 className="mt-3 text-4xl font-black text-white">
          {report.total_savings.toLocaleString()} ISK/year
        </h2>
  
        <div className="mt-6 space-y-4">
          {report.recommendations.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-bold text-white">{item.title}</h3>
                <span className="font-black text-green-400">
                  {item.saving.toLocaleString()} ISK
                </span>
              </div>
  
              <p className="mt-2 text-slate-400">{item.reason}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default SavingsCard;