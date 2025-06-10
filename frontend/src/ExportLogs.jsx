// ExportLogs.jsx
import React from "react";
import * as XLSX from "xlsx";

export default function ExportLogs({ logs }) {
  const handleExport = () => {

    const logsWithIndex = logs.map((log, index) => ({
      Lp: index + 1,
      ...log
    }));

    const headers = [
      "Lp",
      "test_name",
      "result",
      "error_category",
      "test_details",
      "game_version",
      "tester",
      "config",
      "bug_status",
      "comment",
      "time"
    ];

    const ws = XLSX.utils.json_to_sheet(logsWithIndex, { header: headers });

    const wscols = [
      { wch: 5 },  // Lp
      { wch: 20 }, // test_name
      { wch: 15 }, // result
      { wch: 20 }, // error_category
      { wch: 30 }, // test_details
      { wch: 15 }, // game_version
      { wch: 15 }, // tester
      { wch: 15 }, // config
      { wch: 20 }, // bug_status
      { wch: 30 }, // comment
      { wch: 30 }  // time
    ];
    ws["!cols"] = wscols;

    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4F81BD" } },
      alignment: { horizontal: "left" }
    };

    headers.forEach((header, i) => {
      const cellAddress = XLSX.utils.encode_cell({ c: i, r: 0 });
      if (!ws[cellAddress]) ws[cellAddress] = { t: "s", v: header };
      if (!ws[cellAddress].s) ws[cellAddress].s = {};
      ws[cellAddress].s = headerStyle;
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Logs");

    XLSX.writeFile(wb, "logs_export.xlsx");
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
    >
      Export Logs to Excel
    </button>
  );
}