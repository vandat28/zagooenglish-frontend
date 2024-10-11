"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginButton from "@/components/ui/header/login-button";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import UserButton from "@/components/ui/header/user-button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Cookies from "js-cookie";
export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const [openUser, setOpenUser] = useState<boolean>(false);
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      setUser(JSON.parse(cookieUser));
    }
  }, []);

  const handleOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const handleOpenUser = () => {
    openUser ? setOpenUser(false) : setOpenUser(true);
  };

  const handleLogout = () => {
    Cookies.remove("user");
    setOpen(false);
  };

  const navItems = [
    {
      url: "/web",
      name: "Trang chủ",
    },
    {
      url: "/web/learning",
      name: "Học cùng Zagoo",
    },
    {
      url: "/web/blog",
      name: "Blog",
    },
    {
      url: "/web/translate",
      name: "Dịch",
    },
  ];
  const navUserItems = [
    {
      url: "/web/profile",
      name: "Hồ sơ",
    },
  ];

  return (
    <>
      <nav className="bg-white fixed top-0 w-full shadow-lg z-10 h-20">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md border border-gray-400  p-2 text-gray-400 hover:bg-blue-200 hover:border-blue-200 hover:text-white "
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={handleOpen}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {!open ? <MenuIcon /> : <CloseIcon />}
              </button>
            </div>
            <div className="flex flex-1 items-center justify-end sm:items-center sm:justify-start ">
              <Link href="/" className="flex flex-shrink-0 items-center gap-3">
                <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-400 sm:hidden">
                  ZagooEnglish
                </span>
                <img
                  className="h-12 w-auto rounded-lg"
                  src="/img/ZAGOO.png"
                  alt="Logo"
                />
              </Link>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-6">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.url}
                      className={clsx(
                        "text-graydark hover:bg-blue-200  rounded-md px-3 py-2 text-md font-medium",
                        {
                          "bg-blue-200 text-white": pathname === item.url,
                        }
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              {user ? <UserButton /> : <LoginButton />}
            </div>
          </div>
        </div>
        {/* //mobile menu */}
        <div
          className={` sm:hidden transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-[-100%]"
          } fixed top-0 left-0 w-full h-full bg-white shadow-lg p-4 mt-16 space-y-1 px-2 pb-3 pt-2`}
        >
          {navItems.map((item, index) => (
            <Link
              key={index}
              onClick={handleOpen}
              href={item.url}
              className="text-graydark hover:bg-blue-200 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <div
              onClick={handleOpenUser}
              className="relative text-graydark hover:bg-blue-200 hover:text-white block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
            >
              <p>
                Trang cá nhân{" "}
                {openUser ? (
                  <KeyboardArrowLeftIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </p>
              <div
                className={`transform transition-transform duration-300 ${
                  openUser ? "translate-x-0" : "translate-x-[-100%]"
                } top-12 left-0 bg-white space-y-1 pl-3 pt-2 absolute w-full`}
              >
                {navUserItems.map((item, index) => (
                  <Link
                    key={index}
                    onClick={handleOpen}
                    href={item.url}
                    className="text-graydark hover:bg-blue-200 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                <a
                  href="http://localhost:3000/"
                  onClick={handleLogout}
                  className="text-graydark hover:bg-blue-200 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Đăng xuất
                </a>
              </div>
            </div>
          ) : (
            <button
              onClick={handleOpen}
              className="flex items-center justify-center w-full"
            >
              <LoginButton />
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
