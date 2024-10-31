import { Metadata } from "next";
import Blog from "@/components/pages/admin/blog";

export const metadata: Metadata = {
  title: "ZagooEnglish | Admin - BLog",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function Page() {
  return <Blog />;
}
