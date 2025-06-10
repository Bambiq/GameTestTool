import React, { useEffect, useState } from "react";
import { fetchLogs, deleteLog } from "./api";
import LogForm from "./LogForm";
import LogList from "./LogList";
import LogControls from "./LogControls";
import StatsPanel from "./StatsPanel";
import Pagination from "./Pagination";
import ExportLogs from "./ExportLogs";

export default function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");  // filtr po statusie buga
  const [sort, setSort] = useState("newest");   // sortowanie po dacie
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadLogs = () => {
    fetchLogs()
      .then((data) => setLogs(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadLogs();
    const interval = setInterval(() => {
      loadLogs();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogSent = () => {
    loadLogs();
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    try {
      await deleteLog(id);
      setLogs((prev) => prev.filter((log) => log.id !== id));
    } catch (err) {
      alert("Błąd usuwania logu: " + err.message);
    }
  };

  // Filtrowanie po bug_status
  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    return log.bug_status === filter;
  });

  // Sortowanie po dacie
  const sortedLogs = filteredLogs.sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.time) - new Date(a.time);
    } else {
      return new Date(a.time) - new Date(b.time);
    }
  });

  // Paginacja
  const totalPages = Math.ceil(sortedLogs.length / itemsPerPage);
  const paginatedLogs = sortedLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <div>Ładowanie logów...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Historia testów</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-start">
        <div className="md:w-1/2">
          <LogForm onLogSent={handleLogSent} />
        </div>
        <div className="md:w-1/2">
          <StatsPanel logs={logs} />
        </div>
      </div>
      <div className="flex gap-2 mt-4 mb-4">
        <ExportLogs logs={logs} />
      </div>
      <LogControls
        filter={filter}
        sort={sort}
        onFilterChange={setFilter}
        onSortChange={setSort}
      />
      <LogList logs={paginatedLogs} onDelete={handleDelete} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
