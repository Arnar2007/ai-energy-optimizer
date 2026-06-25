function UploadHistory({ uploads }) {
    if (!uploads || uploads.length === 0) return null;
  
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
          Upload History
        </p>
  
        <div className="mt-5 space-y-3">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
            >
              <p className="font-bold text-white">{upload.filename}</p>
              <p className="mt-1 text-sm text-slate-400">
                {new Date(upload.uploaded_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default UploadHistory;