import React from "react";

export default function LogList({ logs, onDelete }) {
  if (logs.length === 0) {
    return <p className="text-gray-600 italic">Brak logów do wyświetlenia.</p>;
  }

  return (
    <div className="mt-4 border rounded bg-white shadow">
      <h2 className="text-lg font-semibold p-4 border-b">Lista logów</h2>
      <ul className="divide-y">
        {logs.map((log) => (
          <li key={log.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{log.test_name}</p>
              <p className="text-sm text-gray-500">
                Wynik:{" "}
                <span
                  className={
                    log.result === "pass" ? "text-green-600" : "text-red-600"
                  }
                >
                  {log.result}
                </span>
              </p>
              <p className="text-xs text-gray-400">
                Date: {new Date(log.time).toLocaleString("pl-PL", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm("Na pewno chcesz usunąć ten log?")) {
                  onDelete(log.id);
                }
              }}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}