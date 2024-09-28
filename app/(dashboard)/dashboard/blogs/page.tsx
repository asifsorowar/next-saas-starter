import React from "react";
import Blogs from "./blogs";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function BlogPage() {
  const blogsPerPage = 8;
  const session = await getSession();

  if (!session?.user.permissions?.includes("read")) redirect("/dashboard");

  return <Blogs blogsPerPage={blogsPerPage} sessionUser={session.user} />;
}
