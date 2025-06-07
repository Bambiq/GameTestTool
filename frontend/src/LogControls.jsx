import React from "react";

export default function LogControls({ filter, sort, onFilterChange, onSortChange }) {
  return (
    <div className="mb-4 p-4 border rounded flex flex-wrap gap-4 items-center">
      <div>
        <label className="mr-2 font-semibold">Filter:</label>
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="all">All</option>
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
        </select>
      </div>

      <div>
        <label className="mr-2 font-semibold">Sort by</label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Latest</option>
        </select>
      </div>
    </div>
  );
}