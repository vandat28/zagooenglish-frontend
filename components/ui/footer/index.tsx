import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-7xl p-8 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <img
                src="/img/ZAGOO.png"
                className="h-14 me-3 rounded-lg"
                alt="Zagoo Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-wrap text-blue-400">
                ZagooEnglish
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-600 uppercase ">
                Theo dõi
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Website
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-600 uppercase ">
                Liên hệ
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline "
                  >
                    Gmail
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Zalo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-600 uppercase ">
                Chính sách
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Chính sách &amp; Điều kiện
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              ZAGOO ENGLISH
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-950 "></a>
            <a href="#" className="text-gray-500 hover:text-gray-950  ms-5"></a>
            <a href="#" className="text-gray-500 hover:text-gray-950  ms-5"></a>
            <a href="#" className="text-gray-500 hover:text-gray-950  ms-5"></a>
            <a href="#" className="text-gray-500 hover:text-gray-950  ms-5"></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
