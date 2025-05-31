import React, { useState } from "react";
import { postLog } from "./api";

export default function LogForm({ onLogSent }) {
  const [testName, setTestName] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!testName.trim() || !result) {
      setError("Proszę wypełnić wszystkie pola.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await postLog({ test_name: testName.trim(), result, time: new Date().toISOString() });
      setTestName("");
      setResult("");
      onLogSent();
    } catch (err) {
      setError("Błąd podczas dodawania logu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow">
      <h2 className="text-lg font-semibold mb-4">Dodaj nowy log testu</h2>

      <label className="block mb-2">
        Nazwa testu:
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          disabled={loading}
          required
        />
      </label>

      <label className="block mb-4">
        Wynik:
        <select
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="mt-1 block w-35 border rounded px-2 py-1"
          disabled={loading}
          required
        >
          <option value="">Wybierz wynik</option>
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
        </select>
      </label>

      {error && <p className="mb-2 text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading || !testName.trim() || !result}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Dodawanie..." : "Dodaj log"}
      </button>
    </form>
  );
}