import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">
          Oops! Trang bạn tìm kiếm không tồn tại.
        </p>
        <p className="text-gray-500 mt-2">
          Có vẻ bạn đã nhầm lẫn điều gì đó, hãy thử quay lại trang chủ.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Quay lại trang chủ
        </a>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt="404 Image"
          className="mt-8 w-64 mx-auto"
        />
      </div>
    </div>
  );
};

export default NotFound;
