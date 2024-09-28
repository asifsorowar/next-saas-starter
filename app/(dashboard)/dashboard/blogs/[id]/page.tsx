import React from "react";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const session = await getSession();

  let actionType: "create" | "update";

  if (params.id === "create") {
    if (!session?.user.permissions?.includes("create"))
      redirect("/dashboard/blogs");

    actionType = "create";
  } else {
    if (!session?.user.permissions?.includes("update"))
      redirect("/dashboard/blogs");

    actionType = "update";
  }

  return (
    <div>
      <p>
        Congratulations, you have access to{" "}
        <span className="text-green-500 font-bold">{actionType}</span> blog!
      </p>
    </div>
  );
}
