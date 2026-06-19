function ForecastCard({
    usage,
    bill,
    confidence,
    explanation,
  }) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
          Forecast
        </p>
  
        <div className="mt-5 space-y-5">
          <div>
            <p className="text-slate-400">Predicted Usage</p>
            <h2 className="text-4xl font-black text-white">
              {usage} kWh
            </h2>
          </div>
  
          <div>
            <p className="text-slate-400">Estimated Bill</p>
            <h2 className="text-4xl font-black text-green-400">
              {bill.toLocaleString()} ISK
            </h2>
          </div>
  
          <div>
            <p className="text-slate-400">Confidence</p>
            <h3 className="text-2xl font-bold text-white">
              {confidence}%
            </h3>
          </div>
  
          <p className="rounded-xl bg-slate-900 p-4 text-slate-300">
            {explanation}
          </p>
        </div>
      </div>
    );
  }
  
  export default ForecastCard;