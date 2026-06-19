import { useState } from "react";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!question.trim()) return;

    const userMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "ai", text: data.answer || "No answer received." },
    ]);

    setQuestion("");
    setLoading(false);
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl">
      <p className="text-sm font-bold uppercase tracking-widest text-green-400">
        VoltWise AI
      </p>

      <h2 className="mt-2 text-2xl font-bold text-white">Ask your energy coach</h2>

      <div className="mt-6 min-h-64 space-y-4">
        {messages.length === 0 && (
          <p className="text-slate-400">
            Ask something like: “How can I reduce my electricity bill?”
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "user"
                ? "ml-auto max-w-md rounded-2xl bg-green-500 p-4 text-slate-950"
                : "max-w-md rounded-2xl bg-slate-800 p-4 text-slate-100"
            }
          >
            {msg.text}
          </div>
        ))}

        {loading && <p className="text-slate-400">VoltWise is thinking...</p>}
      </div>

      <div className="mt-6 flex gap-3">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Ask VoltWise..."
          className="flex-1 rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none focus:border-green-400"
        />

        <button
          onClick={sendMessage}
          className="rounded-full bg-green-500 px-6 py-3 font-bold text-slate-950"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;