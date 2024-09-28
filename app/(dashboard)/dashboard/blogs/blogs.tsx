"use client";

import React, { useEffect, useState, useRef } from "react";
import Search from "@/components/ui/search";
import Filter from "@/components/ui/filter";
import AppTable from "@/components/ui/app-table";
import { BlogStatus, BlogResponse, BlogType } from "@/types/blog.type";
import { Button } from "@/components/ui/button";
import { getBlogsAction } from "@/lib/blogs";
import { SessionUser } from "@/lib/auth/session";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logActivity } from "@/lib/logActivity";
import { ActivityType } from "@/lib/db/schema";

type BlogPropsType = {
  blogsPerPage: number;
  sessionUser: SessionUser;
};

const Blog = ({ blogsPerPage, sessionUser }: BlogPropsType) => {
  const [blogData, setBlogData] = useState<BlogResponse | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const blogColumns = useRef<{ label: string; value: string }[]>();
  const filterOptions =
    useRef<{ value: BlogStatus | string; label: string }[]>();

  const router = useRouter();

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

      if (sessionUser.permissions.length > 1) {
        const columns = blogColumns.current;
        columns.push({
          label: "Actions",
          value: "actions",
        });

        blogColumns.current = columns;
      }
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

  const handleBlogDelete = async (blog: BlogType) => {
    logActivity(sessionUser.teamId, sessionUser.id, ActivityType.DELETE_BLOG);

    alert(`Congratulations, you have access to delete blog '${blog.title}'!`);
  };

  return (
    <div>
      <div className="header mb-3 flex justify-between">
        <div>
          <h3 className="font-medium">Blog Posts</h3>
          <p className="text-[10px] font-thin">
            {blogData?.totalCount || 0} entries found
          </p>
        </div>
        {sessionUser.permissions.includes("create") ? (
          <Button
            asChild
            className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
          >
            <Link href="/dashboard/blogs/create">Create Post</Link>
          </Button>
        ) : null}
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
          customColumnComponents={{
            actions: (row) => (
              <div className="flex gap-4">
                {sessionUser.permissions.includes("update") ? (
                  <p
                    className="hover:text-gray-300 cursor-pointer"
                    onClick={() => router.push(`/dashboard/blogs/${row.id}`)}
                  >
                    Edit
                  </p>
                ) : null}
                {sessionUser.permissions.includes("delete") ? (
                  <p
                    className="hover:text-red-600 text-red-300 cursor-pointer"
                    onClick={() => handleBlogDelete(row)}
                  >
                    Delete
                  </p>
                ) : null}
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Blog;
