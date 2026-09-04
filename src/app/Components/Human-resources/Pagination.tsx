'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 3;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > maxVisiblePages) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - (maxVisiblePages - 1)) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center py-4 border-t border-base-300 bg-base-100">
      <div className="join">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="join-item btn btn-xs sm:btn-sm cursor-pointer disabled:bg-base-200"
        >
          «
        </button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <button
                key={`ellipsis-${index}`}
                type="button"
                className="join-item btn btn-xs sm:btn-sm btn-disabled"
              >
                ...
              </button>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`join-item btn btn-xs sm:btn-sm cursor-pointer ${
                isActive ? 'btn-active btn-primary font-bold' : ''
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="join-item btn btn-xs sm:btn-sm cursor-pointer disabled:bg-base-200"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;