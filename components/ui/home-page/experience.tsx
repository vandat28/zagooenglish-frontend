export default function Experience() {
  return (
    <div className=" flex flex-col-reverse lg:gap-12 lg:flex-row items-center lg:justify-between mt-20 font-medium">
      {/* Left Section with Icons */}
      <div className="flex flex-col items-start justify-center flex-1">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4">
          Những trải nghiệm từ{" "}
          <span className="text-blue-500">Zagoo English</span>
        </h2>
        <p className="text-lg text-gray-800 mb-8">
          Zagoo English: Ứng dụng Học tiếng Anh miễn phí cho tất cả mọi người
        </p>
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center hover:shadow-2xl">
            <div className="bg-blue-100 p-2 rounded-full">
              <img
                src="/img/icon1.svg"
                alt="Bài học đầy đủ, chi tiết"
                className="w-14"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">
                Bài học đầy đủ, chi tiết
              </h3>
              <p className="text-gray-600">
                Mỗi chủ đề (bài học) được thiết kế khoa học, hấp dẫn, lôi cuốn.
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center hover:shadow-2xl">
            <div className="bg-green-100 p-2 rounded-full">
              <img
                src="/img/icon2.svg"
                alt="Trò chơi Tiếng anh thú vị"
                className="w-14"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">
                Trò chơi Tiếng anh thú vị
              </h3>
              <p className="text-gray-600">
                Game từ vựng tiếng Anh thú vị giúp việc học tiếng Anh trở nên dễ
                dàng hấp dẫn hơn.
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center hover:shadow-2xl">
            <div className="bg-gray-200 p-2 rounded-full">
              <img
                src="/img/icon3.svg"
                alt="Rèn luyện 4 kĩ năng"
                className="w-14"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Rèn luyện 4 kĩ năng</h3>
              <p className="text-gray-600">
                Phát triển toàn diện 4 kỹ năng: luyện nghe tiếng Anh, nói tiếng
                Anh, đọc tiếng Anh và viết tiếng Anh.
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center hover:shadow-2xl">
            <div className="bg-red-100 p-2 rounded-full">
              <img
                src="/img/icon4.svg"
                alt="Trò chơi Tiếng anh thú vị"
                className="w-14"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">
                Cải thiện trình độ nhanh chóng
              </h3>
              <p className="text-gray-600">
                Nhiều dạng bài tập thú vị giúp ghi nhớ từ vựng, ngữ pháp hiệu
                quả hơn.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Right Section with Text */}

      <img src="/img/trainghiem.webp" alt="" className="w-64 lg:w-96 mb-8" />
    </div>
  );
}
