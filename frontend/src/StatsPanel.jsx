import React from "react";

export default function StatsPanel({ logs }) {
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
    </div>
  );
}