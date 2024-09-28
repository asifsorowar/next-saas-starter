"use server";

import { BlogResponse, BlogStatus } from "@/types/blog.type";
import { cookies } from "next/headers";

type GetBlogsActionProps = {
  offset?: number;
  limit?: number;
  filter?: { title?: string; status?: BlogStatus };
};

export const getBlogsAction = async ({
  offset = 0,
  limit = 8,
  filter,
}: GetBlogsActionProps): Promise<BlogResponse> => {
  const data = await fetch(
    `${process.env.BASE_URL}/api/blogs?offset=${offset}&limit=${limit}&title=${
      filter?.title || ""
    }&status=${filter?.status || ""}`,
    {
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );

  return await data.json();
};
