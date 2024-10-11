import React from "react";

export default function Intro() {
  return (
    <div
      id="intro"
      className="mt-8 flex flex-col items-center justify-center font-medium"
    >
      <h1 className="text-2xl sm:text-4xl  text-center text-gray-800 my-8 ">
        <span className="text-blue-500 font-bold">Lộ trình học</span>
      </h1>
      <p className="text-center text-gray-800 mb-8">
        Ứng dụng Học tiếng Anh online đáp ứng lộ trình học tập rõ ràng phù hợp
        với trình độ.
      </p>
      <div className="flex flex-col justify-center gap-6 md:gap-[5%] md:flex-row">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-16 text-center md:w-[30%] transform transition-transform duration-300 hover:-translate-y-2">
          <div className=" flex items-center justify-center border p-6  border-green-300 rounded-md">
            <img src="/img/lv1.webp" alt="" className="w-16 md:w-20" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mt-2">Sơ cấp</h2>
          <p className="text-gray-600 mt-2">
            Học kiến thức tiếng Anh giao tiếp thông dụng, phù hợp cho người mới
            bắt đầu.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl px-8 py-16  text-center md:w-[30%] transform transition-transform duration-300 hover:-translate-y-2">
          <div className=" flex items-center justify-center border p-6 border-blue-300 rounded-md">
            <img src="/img/lv2.webp" alt="" className="w-16 md:w-20" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mt-2">
            Trung cấp
          </h2>
          <p className="text-gray-600 mt-2">
            Giúp người học nâng cao trình độ, vượt qua mức căn bản.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl px-8 py-16 text-center md:w-[30%] transform transition-transform duration-300 hover:-translate-y-2">
          <div className=" flex items-center justify-center border p-6 border-yellow-300 rounded-md">
            <img src="/img/lv3.webp" alt="" className="w-16 md:w-20" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mt-2">Cao cấp</h2>
          <p className="text-gray-600 mt-2">
            Bài học được thiết kế ở cấp độ cao hơn, giúp người học trở nên thành
            thạo.
          </p>
        </div>
      </div>
    </div>
  );
}
