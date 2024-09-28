"use client";

import React, { useEffect, useState, useRef } from "react";
import Search from "@/components/ui/search";
import Filter from "@/components/ui/filter";
import AppTable from "@/components/ui/app-table";
import { BlogStatus, BlogResponse } from "@/types/blog.type";
import { getBlogsAction } from "@/lib/blogs";

type BlogPropsType = {
  blogsPerPage: number;
};

const Blog = ({ blogsPerPage }: BlogPropsType) => {
  const [blogData, setBlogData] = useState<BlogResponse | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const blogColumns = useRef<{ label: string; value: string }[]>();
  const filterOptions =
    useRef<{ value: BlogStatus | string; label: string }[]>();

  const loadInitialData = async () => {
    const blogResp = await getBlogsAction({ limit: blogsPerPage });

    // loading the filter options
    filterOptions.current = [
      { label: "Clear Filter", value: "" },
      { label: "Published", value: "Published" },
      { label: "Archived", value: "Archived" },
    ];

    // loading the columns
    if (!blogResp.data.length) blogColumns.current = [];
    else {
      blogColumns.current = Object.keys(blogResp.data[0]).map((value) => ({
        label: value.toUpperCase(),
        value: value,
      }));
    }

    setBlogData(blogResp);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleSearch = (search: string) => {
    getBlogsAction({ filter: { title: search } }).then((resp) => {
      setBlogData(resp);
    });
  };

  const handleFilter = (option: BlogStatus) => {
    getBlogsAction({ filter: { status: option } }).then((resp) => {
      setBlogData(resp);
    });
  };

  const handlePagination = (page: number) => {
    getBlogsAction({
      offset: (page - 1) * blogsPerPage,
      limit: blogsPerPage,
    }).then((resp) => {
      setCurrentPage(page);
      setBlogData(resp);
    });
  };

  return (
    <div>
      <div className="header mb-3">
        <h3 className="font-medium">Blog Posts</h3>
        <p className="text-[10px] font-thin">
          {blogData?.totalCount || 0} entries found
        </p>
      </div>

      <div className="filter flex gap-3 mb-3">
        <Search handleSearch={handleSearch} />

        <Filter
          options={filterOptions.current || []}
          onOptionClick={(option) => handleFilter(option.value as BlogStatus)}
        />
      </div>

      <div className="">
        <AppTable
          columns={blogColumns.current || []}
          data={blogData?.data || []}
          columnsIgnore={["id"]}
          columnsSort={["title", "status"]}
          totalData={blogData?.totalCount || 0}
          dataPerPage={blogsPerPage}
          currentPage={currentPage}
          handlePagination={handlePagination}
        />
      </div>
    </div>
  );
};

export default Blog;
