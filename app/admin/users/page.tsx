import Users from "@/components/pages/admin/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZagooEnglish | Admin - Users",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function Page() {
  return <Users />;
}
