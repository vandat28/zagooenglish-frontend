// Use the client directive for using usePathname hook.
"use client";

import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
// Use usePathname for catching route name.
import { usePathname } from "next/navigation";

export const LayoutProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const hideHeaderAndFooter = /^\/web\/learning\/[^/]+\/\d+$/.test(pathname);
  return (
    <>
      <div className="bg-gradient-to-r from-cyan-100 to-blue-200 ">
        {hideHeaderAndFooter ? (
          <>
            <main>{children}</main>
          </>
        ) : (
          <>
            <Header />
            <main className="mx-auto max-w-7xl p-8 mt-20 ">{children}</main>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};
