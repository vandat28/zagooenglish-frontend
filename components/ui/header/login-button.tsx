import Link from "next/link";
import React from "react";

export default function LoginButton() {
  return (
    <Link
      href="/web/login"
      className="w-full h-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Đăng nhập
    </Link>
  );
}
