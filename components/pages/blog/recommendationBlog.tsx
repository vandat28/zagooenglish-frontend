"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/api/fetcher";
import { API_BLOG_LIST, API_DOMAIN } from "@/constants/api";
import Link from "next/link";

export default function RecommendationBlog() {
  const { data, error, isLoading } = useSWR<Blog[]>(
    `${API_BLOG_LIST}`,
    fetcher
  );
  return (
    <div className="w-full xl:w-[28%] ">
      <h3 className="text-lg font-bold border-l-4 pl-2 border-blue-500 mb-4">
        Các bài viết khác
      </h3>
      <ul className="space-y-4">
        {data &&
          data.slice(0, 6).map((blog) => (
            <li key={blog.id} className="flex items-center space-x-4">
              <img
                src={`${API_DOMAIN}/uploads/${blog.img}`}
                alt={blog.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <a
                href={`/web/blog/${blog.id}`}
                className="text-sm text-blue-800 hover:text-blue-600"
              >
                {blog.title}
              </a>
            </li>
          ))}
      </ul>
      <div className="text-left xl:text-center mt-4">
        <Link
          href="/web/blog"
          className="text-blue-500 text-sm hover:underline "
        >
          <i>Xem tất cả blog...</i>
        </Link>
      </div>
    </div>
  );
}
