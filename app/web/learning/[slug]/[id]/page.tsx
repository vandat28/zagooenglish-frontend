import React from "react";
import type { Metadata } from "next";
import Learning from "@/components/pages/learning-and-playing/learning";
import { getTopicTitle, updateVisits } from "@/lib/data";

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  console.log("+1 lượt học");
  await updateVisits();
  return <Learning id={id} />;
}
export function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const { id } = params;
  return getTopicTitle(id);
}
