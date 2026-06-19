function EnergyScore({ score, label }) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-green-400">
          Energy Score
        </p>
  
        <h2 className="mt-3 text-5xl font-black text-white">
          {score}/100
        </h2>
  
        <p className="mt-2 text-xl font-bold text-green-400">
          {label}
        </p>
  
        <p className="mt-4 text-slate-400">
          This score is based on how stable your electricity usage is.
        </p>
      </div>
    );
  }
  
  export default EnergyScore;