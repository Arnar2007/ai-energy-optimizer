import { useState } from "react";
import { supabase } from "../lib/supabase";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage(
        mode === "login"
          ? "Logged in successfully."
          : "Account created. Check your email if confirmation is required."
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white grid place-items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl"
      >
        <p className="text-green-400 font-bold uppercase tracking-widest">
          ⚡ VoltWise
        </p>

        <h1 className="mt-3 text-4xl font-black">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>

        <input
          className="mt-8 w-full rounded-xl bg-slate-950 border border-slate-700 p-4 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mt-4 w-full rounded-xl bg-slate-950 border border-slate-700 p-4 outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-6 w-full rounded-xl bg-green-500 p-4 font-bold text-slate-950">
          {mode === "login" ? "Log in" : "Sign up"}
        </button>

        {message && <p className="mt-4 text-slate-300">{message}</p>}

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-6 w-full bg-transparent text-green-400"
        >
          {mode === "login"
            ? "Need an account? Sign up"
            : "Already have an account? Log in"}
        </button>
      </form>
    </main>
  );
}

export default Auth;