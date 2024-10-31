"use client";
import { fetcher } from "@/api/fetcher";
import BlogCard from "@/components/ui/blog/blog-card";
import CircleLoading from "@/components/ui/loading/circle-loading";
import { API_BLOG_LIST } from "@/constants/api";
import { Button } from "@mui/material";
import Link from "next/link";
import useSWR from "swr";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Blog() {
  const [cookieValue, setCookieValue] = useState<string | undefined>("");
  useEffect(() => {
    // Lấy giá trị của cookie có tên là 'myCookie'
    const myCookie = Cookies.get("user");
    setCookieValue(myCookie);
  }, [cookieValue]);

  const { data, error, isLoading } = useSWR<Blog[]>(
    `${API_BLOG_LIST}`,
    fetcher
  );
  const blogs = data?.filter((blog) => blog.status === 1);
  if (error) return <div>error</div>;

  return (
    <>
      {cookieValue && (
        <Link href={`/web/blog/create`} className="md:px-20">
          <Button
            size="medium"
            className="hover:bg-gray-200 text-sx"
            variant="outlined"
          >
            Viết Blog
          </Button>
        </Link>
      )}

      <div className="flex flex-col md:px-20">
        {isLoading && <CircleLoading />}

        <div className="flex flex-col items-center md:flex-row md:gap-[10%] lg:gap-[5%] md:flex-wrap mt-8">
          {blogs &&
            blogs.map((blog: Blog, index: number) => (
              <BlogCard key={index} blog={blog} />
            ))}
        </div>
      </div>
    </>
  );
}
