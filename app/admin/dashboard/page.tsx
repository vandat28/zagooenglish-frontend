import { Metadata } from "next";
import Dashboard from "@/components/pages/admin/dashboard";

export const metadata: Metadata = {
  title: "ZagooEnglish | Admin - Dashboard",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function Page() {
  return <Dashboard />;
}
