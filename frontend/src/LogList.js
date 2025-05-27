import React from "react";

export default function LogList({ logs, onDelete }) {
  if (!logs.length) return <p>Brak logów testów.</p>;

  return (
    <ul>
      {logs.map((log) => (
        <li key={log.id} className="mb-2 p-2 border rounded">
          <strong>{log.test_name}</strong> — {log.result} —{" "}
          {new Date(log.time).toLocaleString()}
          <button
            onClick={() => onDelete(log.id)}
            className="ml-4 text-red-600 hover:underline"
          >
            Usuń
          </button>
        </li>
      ))}
    </ul>
  );
}
