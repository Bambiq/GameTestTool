import React, { useState } from "react";
import { postLog } from "./api";

export default function LogForm({ onLogSent }) {
  const [testName, setTestName] = useState("");
  const [result, setResult] = useState("");
  const [errorCategory, setErrorCategory] = useState("");
  const [testDetails, setTestDetails] = useState("");
  const [gameVersion, setGameVersion] = useState("");
  
  const [tester, setTester] = useState("");
  const [config, setConfig] = useState("");
  const [bugStatus, setBugStatus] = useState("");
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!testName.trim() || !result || !bugStatus || !errorCategory) {
      setError("Proszę wypełnić wymagane pola: nazwa testu i wynik.");
      return;
    }

    setLoading(true);
    setError(null);

    const logData = {
      test_name: testName.trim(),
      result,
      error_category: errorCategory.trim(),
      test_details: testDetails.trim(),
      game_version: gameVersion.trim(),
      tester: tester.trim(),
      config: config.trim(),
      bug_status: bugStatus.trim(),
      comment: comment.trim(),
      time: new Date().toISOString(),
    };

    try {
      await postLog(logData);
      // Reset pól formularza
      setTestName("");
      setResult("");
      setErrorCategory("");
      setTestDetails("");
      setGameVersion("");
      setTester("");
      setConfig("");
      setBugStatus("");
      setComment("");
      onLogSent();
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow space-y-2">
      <h2 className="text-lg font-semibold mb-4">Add new Test log</h2>

      <label className="block">
        Name:
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          required
          disabled={loading}
        />
      </label>

      <label className="block">
        Result:
        <select
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          required
          disabled={loading}
        >
          <option value=""></option>
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
        </select>
      </label>

      <label className="block">
        Category:
        <select
          type="text"
          value={errorCategory}
          onChange={(e) => setErrorCategory(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          disabled={loading}
        >
          <option></option>
          <option value="Functional">Functional</option>
          <option value="Performance">Performance</option>
          <option value="Graphics/Visual">Graphics/Visual</option>
          <option value="Audio">Audio</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Networking">Networking</option>
          <option value="Gameplay">Gameplay</option>
          <option value="Crash/Freeze">Crash/Freeze</option>
        </select>
      </label>

      <label className="block">
        Details:
        <textarea
          value={testDetails}
          onChange={(e) => setTestDetails(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          rows={2}
          disabled={loading}
        />
      </label>

      <label className="block">
        Game version:
        <input
          type="text"
          value={gameVersion}
          onChange={(e) => setGameVersion(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          disabled={loading}
        />
      </label>

      <label className="block">
        Tester:
        <input
          type="text"
          value={tester}
          onChange={(e) => setTester(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          disabled={loading}
        />
      </label>

      <label className="block">
        Configuration:
        <input
          type="text"
          value={config}
          onChange={(e) => setConfig(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          disabled={loading}
        />
      </label>

      <label className="block">
        Status:
        <select
          type="text"
          value={bugStatus}
          onChange={(e) => setBugStatus(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          disabled={loading}
        > 
          <option></option>
          <option value="reported">Reported</option>
          <option value="fixed">Fixed</option>
        </select>
      </label>

      <label className="block">
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          rows={2}
          disabled={loading}
        />
      </label>

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add log"}
      </button>
    </form>
  );
}