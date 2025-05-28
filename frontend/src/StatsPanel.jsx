import React from "react";

export default function StatsPanel({ logs }) {
  if (!logs.length) return null;

  const total = logs.length;
  const passed = logs.filter((log) => log.result === "pass").length;
  const failed = logs.filter((log) => log.result === "fail").length;
  const passRate = ((passed / total) * 100).toFixed(1);
  const latest = logs
    .map((log) => new Date(log.time))
    .sort((a, b) => b - a)[0]
    .toLocaleString();

  return (
    <div className="p-4 border rounded bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">Statystyki testów</h2>
      <ul className="space-y-1">
        <li><strong>Wszystkie testy:</strong> {total}</li>
        <li><strong>Pass:</strong> {passed}</li>
        <li><strong>Fail:</strong> {failed}</li>
        <li><strong>Skuteczność (Pass %):</strong> {passRate}%</li>
        <li><strong>Ostatni test:</strong> {latest}</li>
      </ul>
    </div>
  );
}