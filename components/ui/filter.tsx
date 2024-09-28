"use client";

import React, { useState, MouseEvent } from "react";
import Icon from "components/ui/icon";

type OptionType = {
  label: string;
  value: string;
};

type FilterType = {
  options: OptionType[];
  onOptionClick?: (option: OptionType) => void;
};

function Filter({ options, onOptionClick = () => null }: FilterType) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="filter-container relative">
      <button
        id="filter"
        className="h-full flex gap-1 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        onClick={() => setIsFilterOpen((isFilterOpen) => !isFilterOpen)}
      >
        <Icon name="filter" />
        Filters
      </button>

      {isFilterOpen && (
        <div
          id="filterOptions"
          className="absolute z-50 left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option) => (
              <li>
                <button
                  onClick={() => {
                    setIsFilterOpen(false);
                    onOptionClick(option);
                  }}
                  value={option.value}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Filter;
