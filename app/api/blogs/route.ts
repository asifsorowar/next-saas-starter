import { NextRequest, NextResponse } from "next/server";
import { BlogType, BlogStatus, BlogFilter } from "@/types/blog.type";
import { getSession } from "@/lib/auth/session";

const blogs: BlogType[] = [
  {
    id: 1,
    title: "test 1",
    description: "a test description",
    status: "Published",
  },
  {
    id: 2,
    title: "test 2",
    description: "a test description",
    status: "Published",
  },
  {
    id: 3,
    title: "test 4",
    description: "a test description",
    status: "Published",
  },
  {
    id: 4,
    title: "test 3",
    description: "a test description",
    status: "Published",
  },
  {
    id: 5,
    title: "test 4",
    description: "a test description",
    status: "Published",
  },
  {
    id: 5,
    title: "test 5",
    description: "a test description",
    status: "Published",
  },
  {
    id: 6,
    title: "test 6",
    description: "a test description",
    status: "Published",
  },
  {
    id: 7,
    title: "test 8",
    description: "a test description",
    status: "Published",
  },
  {
    id: 8,
    title: "test 7",
    description: "a test description",
    status: "Published",
  },
  {
    id: 9,
    title: "test 9",
    description: "a test description",
    status: "Published",
  },
  {
    id: 10,
    title: "test 10",
    description: "a test description",
    status: "Published",
  },
  {
    id: 11,
    title: "test 11",
    description: "a test description",
    status: "Published",
  },
  {
    id: 12,
    title: "test 12",
    description: "a test description",
    status: "Published",
  },
  {
    id: 13,
    title: "test 13",
    description: "a test description",
    status: "Published",
  },
  {
    id: 14,
    title: "test 14",
    description: "a test description",
    status: "Published",
  },
  {
    id: 15,
    title: "test 15",
    description: "a test description",
    status: "Archived",
  },
  {
    id: 16,
    title: "test 16",
    description: "a test description",
    status: "Published",
  },
];

const getBlogs = (offset = 0, limit = 10, filter: BlogFilter): BlogType[] => {
  if (filter.title) {
    return blogs
      .filter((blog) => blog.title.includes(filter.title || ""))
      .slice(offset, offset + limit + 1);
  }

  if (filter.status) {
    return blogs
      .filter((blog) => blog.status === filter.status)
      .slice(offset, offset + limit + 1);
  }

  return blogs.slice(offset, offset + limit + 1);
};

const getTotalBlogsCount = (filter: BlogFilter): number => {
  if (filter.title) {
    return blogs.filter((blog) => blog.title.includes(filter.title || ""))
      .length;
  }

  if (filter.status) {
    return blogs.filter((blog) => blog.status === filter.status).length;
  }

  return blogs.length;
};

export async function GET(req: NextRequest) {
  let searchParams = req.nextUrl.searchParams;

  let offset = parseInt(searchParams.get("offset") as string);
  let limit = parseInt(searchParams.get("limit") as string);

  offset = offset ? offset : 0;
  limit = limit ? limit : 7;

  const title = searchParams.get("title") ?? "";
  const status = searchParams.get("status") as BlogStatus;

  const filter: BlogFilter = {
    title,
  };
  if (status) filter.status = status;

  const totalBlogs = getTotalBlogsCount(filter);

  const blogs = getBlogs(offset, limit, filter);

  return NextResponse.json(
    {
      data: blogs,
      nextOffset: blogs.length < limit ? null : limit + 1,
      totalCount: totalBlogs,
    },
    { status: 200 }
  );
}
