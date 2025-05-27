import React from "react";

export default function LogList({ logs, onDelete }) {
  if (!logs.length) return <p>Brak logów testów.</p>;

  return (
    <ul>
      {logs.map((log) => (
        <li
          key={log.id}
          className="mb-2 p-2 border rounded flex justify-between items-center"
        >
          <span>
            <strong>{log.test_name}</strong> — {log.result} —{" "}
            {new Date(log.time).toLocaleString()}
          </span>
          <button
            onClick={() => onDelete(log.id)}
            className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Usuń
          </button>
        </li>
      ))}
    </ul>
  );
}