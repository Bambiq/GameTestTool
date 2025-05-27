import React, { useEffect, useState } from "react";
import LogList from "./LogList";
import LogForm from "./LogForm";

export default function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pobierz logi z backendu
  useEffect(() => {
    fetch("https://laughing-space-winner-x5r6wqqx5rwjfrxw-8000.app.github.dev/logs")
      .then((res) => {
        if (!res.ok) throw new Error("Błąd pobierania logów");
        return res.json();
      })
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Dodaj nowy log do listy
  const addLog = (newLog) => {
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  if (loading) return <p>Ładowanie logów...</p>;
  if (error) return <p style={{ color: "red" }}>Błąd: {error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Game Test Tool - Logi testów</h1>
      <LogForm onAdd={addLog} />
      <LogList logs={logs} />
    </div>
  );
}