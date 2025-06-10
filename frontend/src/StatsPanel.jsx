import React, { useState } from "react";

export default function StatsPanel({ logs }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!logs.length) return null;

  const total = logs.length;
  const passed = logs.filter((log) => log.result === "pass").length;
  const failed = logs.filter((log) => log.result === "fail").length;
  const passRate = ((passed / total) * 100).toFixed(1);
  const latestDate = logs
    .map((log) => new Date(log.time + "Z"))
    .sort((a, b) => b - a)[0];

  const latest = latestDate.toLocaleString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  const bugStatuses = [
    "New",
    "Assigned",
    "Open",
    "Duplicate",
    "Rejected",
    "Deffered",
    "Not a Bug",
    "Fixed",
    "Pending Retest",
    "Retest",
    "ReOpen",
    "Verified",
    "Closed"
  ];

  const bugCounts = bugStatuses.reduce((acc, status) => {
    acc[status] = logs.filter((log) => log.bug_status === status).length;
    return acc;
  }, {});

  return (
    <div className="p-4 border rounded bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">Log Statistics</h2>
      <ul className="space-y-1">
        <li><strong>All Logs:</strong> {total}</li>
        <li><strong>Pass:</strong> {passed}</li>
        <li><strong>Fail:</strong> {failed}</li>
        <li><strong>Effectiveness (Pass %):</strong> {passRate}%</li>
        <li><strong>Last Log:</strong> {latest}</li>
      </ul>

      <div className="mt-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {isOpen}
          <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <div className="mt-2 border-t border-gray-300 pt-2">
            <h2 className="font-bold">Bug Status Counts:</h2>
            <ul className="space-y-1">
              {bugStatuses.map((status) => (
                <li key={status}>
                  <strong>{status}:</strong> {bugCounts[status]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}