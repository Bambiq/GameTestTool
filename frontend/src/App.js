import React, { useEffect, useState } from "react";
import { fetchLogs, postLog } from "./api";

function LogForm({ onLogSent }) {
  const [testName, setTestName] = useState("");
  const [result, setResult] = useState("pass");
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSending(true);

    try {
      const log = { test_name: testName, result, time: new Date().toISOString() };
      await postLog(log);
      onLogSent(log);
      setTestName("");
      setResult("pass");
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Wyślij nowy log testu</h2>
      <label className="block mb-2">
        Nazwa testu:
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          required
          className="ml-2 border px-2 py-1"
        />
      </label>
      <label className="block mb-2">
        Wynik:
        <select
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="ml-2 border px-2 py-1"
        >
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
        </select>
      </label>
      <button
        type="submit"
        disabled={sending}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {sending ? "Wysyłanie..." : "Wyślij log"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}

export default function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLogs()
      .then((data) => setLogs(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Ładowanie logów...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Historia testów</h1>
      {logs.length === 0 && <p>Brak logów testów.</p>}
      <ul>
        {logs.map((log, i) => (
          <li key={i} className="mb-2 p-2 border rounded">
            <strong>{log.test_name}</strong> — {log.result} —{" "}
            {new Date(log.time).toLocaleString()}
          </li>
        ))}
      </ul>

      <LogForm onLogSent={(log) => setLogs((prev) => [log, ...prev])} />
    </div>
  );
}