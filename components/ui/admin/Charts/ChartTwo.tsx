"use client";

import { fetcher } from "@/api/fetcher";
import { API_DASHBOARD_TOPICRANK, UPLOAD_DOMAIN } from "@/constants/api";
import React from "react";
import useSWR from "swr";

const ChartTwo: React.FC = () => {
  const { data, error, isLoading, mutate } = useSWR<any>(
    `${API_DASHBOARD_TOPICRANK}`,
    fetcher
  );
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            TOP 5 Chủ Đề
          </h4>
        </div>
      </div>

      {data &&
        data.map((topic: any, key: number) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{key + 1}</p>
            </div>
            <div className="col-span-2 flex items-center">
              <img
                src={`${UPLOAD_DOMAIN}/${topic.img}`}
                alt=""
                className="w-10"
              />
            </div>
            <div className="col-span-4 hidden items-center sm:flex">
              <p className="text-md text-black dark:text-white">{topic.name}</p>
            </div>
            <div className="col-span-2 flex items-center text-sm">
              {topic.topic_count} lượt học
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChartTwo;
