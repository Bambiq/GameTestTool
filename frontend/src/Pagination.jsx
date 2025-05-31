import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
      >
        Poprzednia
      </button>
      <span>
        Strona {currentPage} z {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
      >
        Następna
      </button>
    </div>
  );
}
