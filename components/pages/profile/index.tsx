"use client";
import { CircularProgressWithLabel } from "@/components/ui/process-bar";
import { API_PROCESS } from "@/constants/api";
import { useUser } from "@/context/user";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [data, setData] = useState<Topic[]>([]);
  const { user } = useUser();

  useEffect(() => {
    getData(user?.username);
  }, []);

  const getData = async (cookieUser: any) => {
    try {
      const response = await axios.get(`${API_PROCESS}/${cookieUser}`);
      if (response.data) {
        setData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const filteredData = data.filter((item) => item.progress > 0);
  const completeTopic = data.filter((item) => item.progress == 100).length;

  return (
    <div className="flex flex-col items-center md:flex-row  gap-8 md:p-20 font-medium">
      <div className="flex flex-col items-center md:w-1/3">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
          <img
            src={
              user?.avatar ||
              `https://dinoenglish.app/_next/image?url=%2Fassets%2Fdrawable%2Fic_default_ava_male.png&w=1920&q=75`
            }
            alt="User Avatar"
            className="rounded-full"
          />
        </div>

        <p className="mt-2 text-gray-500 text-center">
          Nơi lưu tiến trình học của
        </p>
        <p className="mt-2 text-gray-500 text-center">
          {user?.fullname || user?.username}
        </p>
      </div>
      <div className="overflow-hidden w-full md:w-2/3 flex flex-col lg:grow">
        <div className="w-full">
          <h2 className="text-2xl font-medium mb-4">Gần đây</h2>
          <div className="w-full max-w-full flex flex-nowrap gap-3 my-4 overflow-auto h-24 scroll-container">
            {filteredData.length < 1 ? (
              <p>Bạn chưa học chủ đề nào</p>
            ) : (
              filteredData.map((element: Topic, index: number) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-white p-1 flex justify-center items-center rounded-full "
                >
                  <CircularProgressWithLabel value={element.progress} size={64}>
                    <img
                      src={`http://localhost:8080/uploads/${element.img}`}
                      className="w-14"
                    />
                  </CircularProgressWithLabel>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="w-full text-xl">
          <h2 className="text-2xl font-medium mb-4">Tiến độ học</h2>
          <div className="flex justify-between mb-4">
            <span className="text-gray-700">Tổng kinh nghiệm</span>
            <span className="text-yellow-500">369 exp</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-700">Chủ đề đã hoàn thành</span>
            <span className="text-blue-500">
              {completeTopic}/{data.length}
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-700">Bài kiểm tra đã hoàn thành</span>
            <span className="text-red-500">0/3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
