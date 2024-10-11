import React from "react";

import Intro from "@/components/ui/home-page/intro";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import StartButton from "@/components/ui/home-page/start-button";
import Link from "next/link";
import Experience from "@/components/ui/home-page/experience";
import Reviews from "@/components/ui/home-page/reviews";
export default function HomePage() {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <img
          src="/img/Zagoo_learning-removebg-preview.png"
          alt="Dino Mascot"
          className="w-80 sm:w-96 h-auto "
        />
        <main className="mt-4 text-center ">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 leading-normal">
            Học Tiếng Anh trực tuyến miễn phí{" "}
          </h1>
          <h1 className="text-blue-500 text-2xl sm:text-4xl font-bold leading-normal">
            cùng ZagooEnglish
          </h1>
          <ul className="mt-6 text-left text-gray-600 space-y-6 font-medium">
            <li className="flex">
              <ArrowRightIcon />
              <p>
                Học Tiếng Anh căn bản cho người mới bắt đầu hoặc nâng cao trình
                độ cho người mất gốc.
              </p>
            </li>
            <li className="flex">
              <ArrowRightIcon />
              <p>Học Tiếng Anh cho các em học sinh, sinh viên, người đi làm.</p>
            </li>
            <li className="flex">
              <ArrowRightIcon />
              <p>
                Học Tiếng Anh giao tiếp, Tiếng Anh học thuật, học Tiếng Anh
                online mỗi ngày.
              </p>
            </li>
            <li className="flex">
              <ArrowRightIcon />
              <p>
                Dễ dàng sử dụng, vừa học vừa chơi, đồng bộ trên mọi thiết bị,
                ...
              </p>
            </li>
          </ul>
          <Link
            href="/web/learning"
            className="flex items-center justify-center mt-4 h-12"
          >
            <StartButton />
          </Link>
        </main>
      </div>
      <Intro />
      <Experience />
      <Reviews />
    </>
  );
}
