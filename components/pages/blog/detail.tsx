"use client";
import { fetcher } from "@/api/fetcher";
import RecommendationBlog from "@/components/pages/blog/recommendationBlog";
import CircleLoading from "@/components/ui/loading/circle-loading";
import { API_BLOG, API_DOMAIN } from "@/constants/api";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

type BlogDetailProps = {
  id: number;
};
export default function BlogDetail({ id }: BlogDetailProps) {
  const { data, error, isLoading } = useSWR<Blog>(`${API_BLOG}/${id}`, fetcher);

  if (error) return <div>error</div>;

  return (
    <>
      {isLoading && <CircleLoading />}
      {data && (
        <div className="flex flex-col xl:flex-row justify-between p-8 mx-auto max-w-screen-xl bg-white rounded-xl gap-y-6 xl:gap-x-[4%]">
          <article className="w-full xl:w-[68%] format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {data.title}
              </h1>
            </header>
            <img
              src={`${API_DOMAIN}/uploads/${data.img}`}
              alt=""
              className="w-full mb-6"
            />
            <p className="mb-6">{data.description}</p>
            <div
              className="mt-6"
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></div>
          </article>
          <RecommendationBlog />
        </div>
      )}
    </>
  );
}
