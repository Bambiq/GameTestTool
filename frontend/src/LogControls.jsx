import React from "react";

export default function LogControls({ filter, sort, onFilterChange, onSortChange }) {
  return (
    <div className="mb-4 p-4 border rounded flex flex-wrap gap-4 items-center">
      <div>
        <label className="mr-2 font-semibold">Filter by Bug Status:</label>
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="all">All</option>
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
          <option value="Open">Open</option>
          <option value="Duplicate">Duplicate</option>
          <option value="Rejected">Rejected</option>
          <option value="Deffered">Deffered</option>
          <option value="Not a Bug">Not a Bug</option>
          <option value="Fixed">Fixed</option>
          <option value="Pending Retest">Pending Retest</option>
          <option value="Retest">Retest</option>
          <option value="ReOpen">ReOpen</option>
          <option value="Verified">Verified</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div>
        <label className="mr-2 font-semibold">Sort by Date:</label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}
