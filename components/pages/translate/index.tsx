"use client";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CloseIcon from "@mui/icons-material/Close";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ToastNotification, {
  notifyError,
  notifySuccess,
} from "@/components/ui/toast-notification";

export default function Translate() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("en");
  const [outputLanguage, setOutputLanguage] = useState("vi");
  const [inputLanguageTitle, setInputLanguageTitle] = useState("Tiếng Anh");
  const [outputLanguageTitle, setOutputLanguageTitle] = useState("Tiếng Việt");
  const [speaking, setSpeaking] = useState(false);
  const [isActive, setIsActive] = useState("");

  const languageOptions = [
    { code: "vi", title: "Tiếng Việt" },
    { code: "en", title: "Tiếng Anh" },
    { code: "fr", title: "Tiếng Pháp" },
    { code: "es", title: "Tiếng Tây Ban Nha" },
    { code: "de", title: "Tiếng Đức" },
    { code: "ja", title: "Tiếng Nhật" },
    { code: "ko", title: "Tiếng Hàn" },
    { code: "zh-CN", title: "Tiếng Trung (Giản thể)" },
    { code: "zh-TW", title: "Tiếng Trung (Phồn thể)" },
  ];

  useEffect(() => {
    if (inputText) {
      handleTranslate(inputText);
    }
  }, [inputLanguage, outputLanguage]);

  const handleTranslate = async (inputText: string) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
      inputText
    )}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      if (!inputText) {
        setTranslatedText("");
      }
      setTranslatedText(result[0][0][0]);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  const handleSwitchLanguages = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
    setInputLanguageTitle(outputLanguageTitle);
    setOutputLanguageTitle(inputLanguageTitle);
    setInputText(translatedText);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    handleTranslate(e.target.value);
  };

  const speak = (text: string, language: string) => {
    if (!speaking && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      setSpeaking(true);
      setIsActive(language);
      utterance.onend = () => {
        setSpeaking(false);
        setIsActive("");
      };
      speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = async () => {
    try {
      if (translatedText) {
        await navigator.clipboard.writeText(translatedText);
        notifySuccess("Đã sao chép bản dịch!");
      }
    } catch (err) {
      console.error("Không thể sao chép text: ", err);
      notifyError("Gặp lỗi khi sao chép bản dịch!");
    }
  };

  return (
    <div className="p-4 2xl:min-h-[728px] flex justify-center items-center">
      <div className="w-full">
        {" "}
        <div className="flex justify-center mb-4 flex-col md:flex-row gap-2">
          <div className="relative md:w-1/2 w-full">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
              value={inputText}
              onChange={handleInputChange}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {!!inputText && (
              <button
                onClick={() => {
                  setTranslatedText("");
                  setInputText("");
                }}
                className="hover:bg-gray-50 rounded-md  absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <CloseIcon />
              </button>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 md:flex-row md:w-1/2">
            <select
              value={inputLanguage}
              onChange={(e) => {
                setInputLanguage(e.target.value);
                const selectedTitle = languageOptions.find(
                  (option) => option.code === e.target.value
                )?.title;
                selectedTitle && setInputLanguageTitle(selectedTitle);
              }}
              className="border w-full border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            >
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.title}
                </option>
              ))}
            </select>
            <div className="  items-center flex justify-center">
              <button
                onClick={handleSwitchLanguages}
                className="hover:bg-gray-200 rounded-full  h-8 w-8 text-center"
              >
                <SwapHorizIcon className=" text-gray-800" />
              </button>
            </div>
            <select
              value={outputLanguage}
              onChange={(e) => {
                setOutputLanguage(e.target.value);
                const selectedTitle = languageOptions.find(
                  (option) => option.code === e.target.value
                )?.title;
                selectedTitle && setOutputLanguageTitle(selectedTitle);
              }}
              className="border w-full border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            >
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full border rounded-lg p-4 shadow-md bg-white h-64">
            <div className="border-b pb-2 mb-2 flex justify-between items-center">
              <span className="text-blue-600">{inputLanguageTitle}</span>
              <div className="items-center flex justify-center">
                <button
                  onClick={() => speak(inputText, inputLanguage)}
                  className="hover:bg-gray-200 rounded-full  h-8 w-8 text-center"
                >
                  <VolumeUpIcon
                    className={` ${
                      inputLanguage == isActive
                        ? "text-blue-300"
                        : "text-gray-800"
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="text-xl font-medium">{inputText}</div>
          </div>
          <div className="w-full border rounded-lg p-4 shadow-md bg-white h-64 relative">
            <div className="border-b pb-2 mb-2 flex justify-between items-center">
              <span className="text-blue-600">{outputLanguageTitle}</span>
              <div className="items-center flex justify-center">
                <button
                  onClick={() => speak(translatedText, outputLanguage)}
                  className="hover:bg-gray-200 rounded-full  h-8 w-8 text-center"
                >
                  <VolumeUpIcon
                    className={` ${
                      outputLanguage == isActive
                        ? "text-blue-300"
                        : "text-gray-800"
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="text-xl font-medium">{translatedText}</div>
            <button
              onClick={handleCopy}
              className="hover:text-black text-center absolute bottom-4 left-4 text-gray-500"
            >
              <ContentCopyIcon />
            </button>
          </div>
        </div>
      </div>
      <ToastNotification />
    </div>
  );
}
