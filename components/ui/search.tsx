"use client";

import React, {
  useTransition,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import Icon from "components/ui/icon";

type SearchPropsType = {
  handleSearch: (value: string) => void;
};

const Search = ({ handleSearch = () => null }: SearchPropsType) => {
  const [search, setSearch] = useState<string>("");
  const [pending, startTransition] = useTransition();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    startTransition(() => {
      setSearch(value);
    });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(search);
    }
  };

  return (
    <div className="search-container relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Icon name="search" className="text-gray-500 w-4 h-4" />
      </div>
      <input
        type="text"
        id="search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Search title..."
        required
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        value={search}
      />
    </div>
  );
};

export default Search;
