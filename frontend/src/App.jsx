import React, { useEffect, useState } from "react";
import { fetchLogs, deleteLog } from "./api";
import LogForm from "./LogForm";
import LogList from "./LogList";
import LogControls from "./LogControls"; // <-- NOWY import

export default function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // <-- filter
  const [sort, setSort] = useState("newest");  // <-- sort

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
  };

  const handleDelete = async (id) => {
    try {
      await deleteLog(id);
      setLogs((prev) => prev.filter((log) => log.id !== id));
    } catch (err) {
      alert("Błąd usuwania logu: " + err.message);
    }
  };

  const filteredLogs = logs
    .filter((log) => {
      if (filter === "all") return true;
      return log.result === filter;
    })
    .sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.time) - new Date(a.time);
      } else {
        return new Date(a.time) - new Date(b.time);
      }
    });

  if (loading) return <div>Ładowanie logów...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Historia testów</h1>
      <LogForm onLogSent={handleLogSent} />
      <LogControls
        filter={filter}
        sort={sort}
        onFilterChange={setFilter}
        onSortChange={setSort}
      />
      <LogList logs={filteredLogs} onDelete={handleDelete} />
    </div>
  );
}