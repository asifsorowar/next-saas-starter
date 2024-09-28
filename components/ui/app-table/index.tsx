"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import Pagination from "./pagination";

type Column = {
  label: string;
  value: string;
};

type SortedColumn = {
  column: string;
  sorted: "asc" | "desc" | "";
};

type AppTablePropsType<T> = {
  data: T[];
  columns: Column[];
  totalData: number;
  dataPerPage: number;
  handlePagination: (page: number) => void;
  currentPage: number;
  columnsSort?: string[];
  columnsIgnore?: string[];
};

const appTable = <T extends Record<string, any>>({
  data,
  columns,
  columnsIgnore = [],
  columnsSort = [],
  dataPerPage,
  totalData,
  currentPage,
  handlePagination,
}: AppTablePropsType<T>) => {
  const [tableData, setTableData] = useState<T[] | undefined>();
  const [tableColumns, setTableColumns] = useState<Column[] | undefined>();
  const [sortedColumn, setSortedColumn] = useState<SortedColumn | undefined>();

  useEffect(() => {
    setTableData(data);

    // Table columns initialization
    let tableColumns = columns;

    if (columnsIgnore.length) {
      tableColumns = tableColumns.filter(
        (column) => !columnsIgnore.includes(column.value)
      );
    }

    setTableColumns(tableColumns);
  }, [data, columns]);

  const handleHeaderColumnClick = (
    e: MouseEvent<HTMLTableHeaderCellElement>
  ) => {
    const columnValue = e.currentTarget.title;
    if (!columnsSort.includes(columnValue)) return;

    const isAlreadySorted = sortedColumn?.column === columnValue || false;
    const sorted = sortedColumn?.sorted || "";

    const sortedTableData = tableData?.toSorted((a, b) => {
      if (typeof a[columnValue] === "string") {
        if (isAlreadySorted && sorted === "asc")
          return b[columnValue].localeCompare(a[columnValue]);

        return a[columnValue].localeCompare(b[columnValue]);
      }

      if (isAlreadySorted && sorted === "asc")
        return b[columnValue] - a[columnValue];

      return a[columnValue] - b[columnValue];
    });

    setSortedColumn({
      column: columnValue,
      sorted: sorted === "" || sorted === "desc" ? "asc" : "desc",
    });
    setTableData(sortedTableData);
  };

  return (
    <div className="table-container flex flex-col min-h-96">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex-1">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {tableColumns?.map((column) => (
                <th
                  key={column.value}
                  scope="col"
                  className={`px-6 py-3 ${
                    columnsSort.includes(column.value)
                      ? "cursor-pointer hover:bg-gray-200"
                      : ""
                  }`}
                  title={column.value}
                  onClick={handleHeaderColumnClick}
                >
                  {column.value.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item, i) => (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {tableColumns?.map((column) => (
                  <td key={column.value + i} className="px-6 py-4">
                    {item[column.value as keyof T]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-5 w-full text-end">
        <Pagination
          totalContents={totalData}
          pageContentSize={dataPerPage}
          currentPage={currentPage}
          handlePaginationClick={handlePagination}
        />
      </div>
    </div>
  );
};

export default appTable;
