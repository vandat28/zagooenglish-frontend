import React from "react";

import { Metadata } from "next";
import HomePage from "@/components/pages/home-page";

export const metadata: Metadata = {
  title: "Zagoo English - Website học tiếng Anh trực tuyến hàng đầu Việt Nam",
};

export default function Page() {
  return (
    <>
      <HomePage />
    </>
  );
}
