import TextEditor from "@/components/pages/blog/create";
import React from "react";

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Zagoo English - Create Blog",
  description: "Generated by create next app",
};

export default function Page() {
  const cookieUser = cookies().get("user");
  if (cookieUser) {
    return <TextEditor />;
  }
  redirect(`/`);
}