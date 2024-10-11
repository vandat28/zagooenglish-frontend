"use client";
import { fetcher } from "@/api/fetcher";
import CircleLoading from "@/components/ui/loading/circle-loading";
import { API_BLOG } from "@/constants/api";
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
        <div className="flex justify-between p-8 mx-auto max-w-screen-xl bg-white rounded-xl">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {data.title}
              </h1>
            </header>
            <img
              src={`http://localhost:8080/uploads/${data.img}`}
              alt=""
              className="w-full mb-6"
            />
            <p className="mb-6">{data.description}</p>
            <div
              className="mt-6"
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></div>
          </article>
        </div>
      )}
    </>
  );
}
