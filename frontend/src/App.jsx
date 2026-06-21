import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div className="loading">Loading VoltWise...</div>;

  return session ? <Dashboard /> : <Auth />;
}

export default App;