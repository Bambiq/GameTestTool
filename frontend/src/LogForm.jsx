import React, { useState } from "react";
import { postLog } from "./api";

export default function LogForm({ onLogSent }) {
  const [testName, setTestName] = useState("");
  const [result, setResult] = useState("pass");
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSending(true);

    try {
      const log = {
        test_name: testName,
        result,
        time: new Date().toISOString(),
      };

      await postLog(log);
      setTestName("");
      setResult("pass");
      onLogSent();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-50">
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