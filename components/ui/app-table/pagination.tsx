"use client";

import React, { useEffect, useMemo, useState, MouseEvent } from "react";

const pagination = ({
  pageContentSize,
  totalContents,
  currentPage,
  handlePaginationClick,
}: {
  pageContentSize: number;
  totalContents: number;
  currentPage: number;
  handlePaginationClick: (page: number) => void;
}) => {
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const pages = Math.ceil(totalContents / pageContentSize);

    setTotalPages(pages);
  }, [pageContentSize, totalContents]);

  const pageNumbers = useMemo(
    () => [...Array(totalPages).keys()].map((i) => i + 1),
    [totalPages]
  );

  if (totalPages === 1) return;

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              className={`flex items-center justify-center px-3 h-8 rounded-sm mr-2 leading-tight text-gray-500 bg-white border 
              border-gray-300 hover:bg-gray-100 hover:text-gray-700 
              dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
               dark:hover:bg-gray-700 dark:hover:text-white ${
                 currentPage === page ? "text-blue-600 font-bold" : ""
               }`}
              onClick={() => handlePaginationClick(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default pagination;
