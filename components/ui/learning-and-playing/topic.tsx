"use client";
import { CircularProgressWithLabel } from "@/components/ui/process-bar";
import { UPLOAD_DOMAIN } from "@/constants/api";
import { Dialog, DialogContent } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

type TopicProps = {
  color: string;
  topic: Topic;
  slug: string;
};

export default function Topic(props: TopicProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`bg-blue-100 p-4 mb-4 md:mb-8 rounded-2xl shadow-lg flex items-center justify-between transform transition-transform duration-300 hover:-translate-y-2  hover:shadow-2xl w-full  md:w-[45%] lg:w-[30%] cursor-pointer`}
      >
        <div className="ml-4">
          <h3 className="text-lg font-semibold ">{props.topic.name}</h3>
          <p className="text-black-2 text-sm"> {props.topic.label}</p>
        </div>

        <div className="bg-white p-1 flex justify-center items-center rounded-full w-24 h-24">
          <CircularProgressWithLabel value={props.topic.progress} size={96}>
            <img
              src={`${UPLOAD_DOMAIN}/${props.topic.img}`}
              className="w-20 rounded-full" // Thêm h-20 để đảm bảo chiều cao bằng chiều rộng
            />
          </CircularProgressWithLabel>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        disableScrollLock={true}
      >
        <DialogContent>
          <div className="p-12 w-80 flex flex-col items-center">
            <img
              src={`${UPLOAD_DOMAIN}/${props.topic.img}`}
              className="w-14 md:w-20 rounded-full"
            />
            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold ">{props.topic.name}</h3>
              <p className="text-gray-600 text-sm font-medium">
                {props.topic.label}
              </p>
            </div>
            <div className="mt-8 text-center w-full">
              <Link
                href={`/web/learning/${props.slug}/${props.topic.id}`}
                className="block text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-md px-5 py-2.5 text-center "
              >
                {props.topic.progress == 100 ? "Học Lại" : "Học"}
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
