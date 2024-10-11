"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { API_PROCESS } from "@/constants/api";
import { convertTimestampToDateTime } from "@/utils";

type ModalCorrectProps = {
  open: boolean;
  setOpen: (boolean: boolean) => void;
  setIndex: (index: number) => void;
  index: number;
  length: number;
  setOpacity: (boolean: boolean) => void;
  audioSrc: string;
  username?: string;
  topicId: number;
  progress: number;
};

export default function ModalCorrect(props: ModalCorrectProps) {
  const updateProcess = async (index: number) => {
    const data = {
      username: props.username,
      topicId: props.topicId,
      learningTime: convertTimestampToDateTime(new Date().getTime()),
      process: props.length === index ? 1 : index + 1,
      progress: props.progress == 100 ? 100 : (index * 100) / props.length,
    };

    try {
      const response = await axios.put(API_PROCESS, data);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  const handleNextButton = (index: number) => {
    props.setOpen(false);

    setTimeout(() => {
      props.setIndex(index + 1);
    }, 1000);
    setTimeout(() => {
      props.setOpacity(true);
    }, 300);
    if (props.username) updateProcess(index + 1);
  };

  const handleComplete = (index: number) => {
    if (props.username) updateProcess(index + 1);
    window.location.href = "http://localhost:3000/web/learning";
  };
  return (
    <>
      <div
        className={` ${
          props.open ? "visible" : "invisible"
        } fixed inset-0 inset-x-0 bg-white/60 z-10 duration-150 ease-out flex justify-center opacity-100`}
      >
        <div
          className={` absolute  bottom-60  z-10 transform transition-transform duration-200
            ${props.open ? "translate-y-0" : "translate-y-[100%]"}`}
        >
          <div className="flex w-full items-center justify-center">
            <div className="sprite-animation scale-110"></div>
          </div>
        </div>
        <div
          className={` absolute w-full max-w-2xl bottom-0 max-h-full  transform transition-transform duration-300
            ${props.open ? "translate-y-[0]" : "translate-y-[100%]"}`}
        >
          <div className=" bg-blue-400 shadow-lg rounded-t-3xl h-60">
            <div className="flex items-center justify-center gap-2 pt-4 md:pt-10 rounded-t">
              <h3 className="text-xl font-medium text-white ">
                Chính xác rồi!
              </h3>
              {/* <button
                onClick={() => {
                  const audio = new Audio(props.audioSrc);
                  audio.play();
                }}
              >
                <PlayCircleIcon className="text-white text-4xl cursor-pointer hover:text-gray-300" />
              </button> */}
            </div>
            <p className="text-md text-white text-center">Bạn giỏi quá</p>

            <div className=" mt-9 p-4 md:px-12 md:py-9">
              {props.length === props.index + 1 ? (
                <button
                  type="button"
                  onClick={() => handleComplete(props.index)}
                  className=" w-full block text-blue-500 bg-white  font-medium rounded-full text-lg px-5 py-2.5 text-center hover:bg-slate-100"
                >
                  Hoàn thành
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleNextButton(props.index)}
                  className=" w-full text-blue-500 bg-white  font-medium rounded-full text-lg px-5 py-2.5 text-center hover:bg-slate-100"
                >
                  Tiếp tục
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
