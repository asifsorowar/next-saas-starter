import React from "react";
import Blogs from "./blogs";

export default async function BlogPage() {
  const blogsPerPage = 8;

  return <Blogs blogsPerPage={blogsPerPage} />;
}
