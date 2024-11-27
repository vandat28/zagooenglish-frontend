"use client";
import { fetcher } from "@/api/fetcher";
import Level from "@/components/ui/learning-and-playing/level";
import CircleLoading from "@/components/ui/loading/circle-loading";
import { API_LEVEL } from "@/constants/api";
import { useUser } from "@/context/user";
import useSWR from "swr";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

function removeAccents(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export default function LearningAndPlaying() {
  const { user } = useUser();
  const [inputText, setInputText] = useState("");
  const { data, error } = useSWR<GetLevelResponse>(
    `${API_LEVEL}?username=${user?.username}`,
    fetcher
  );

  const isLoading = !data && !error;

  if (error) return <div>Error</div>;
  if (isLoading) return <CircleLoading />;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  function searchTopicsByName(
    data: GetLevelResponse | undefined,
    searchTerm: string
  ) {
    if (!searchTerm) {
      // Trả về dữ liệu gốc nếu không có searchTerm
      return data;
    }
    if (data) {
      const normalizedSearchCondition = removeAccents(
        searchTerm.toLowerCase().trim()
      );
      return {
        result: data.result
          .map((level) => {
            // Lọc topics theo searchTerm
            const filteredTopics = level.topics.filter((topic) => {
              const normalizedName = removeAccents(topic.name.toLowerCase());
              return normalizedName.includes(normalizedSearchCondition);
            });

            // Nếu level có topics khớp, giữ lại
            if (filteredTopics.length > 0) {
              return {
                ...level,
                topics: filteredTopics, // Cập nhật topics với kết quả lọc
              };
            }
            return null; // Bỏ level không có kết quả khớp
          })
          .filter((level) => level !== null), // Loại bỏ các level null
      };
    }
  }

  const filteredData = searchTopicsByName(data, inputText);

  return (
    <>
      <div className="flex justify-center mb-4">
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
                setInputText("");
              }}
              className="hover:bg-gray-50 rounded-md  absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>

      {filteredData &&
        filteredData.result.map((level: Level, index: number) => (
          <Level
            key={index}
            color={level.color}
            img={level.img}
            name={level.name}
            slug={level.slug}
            topics={level.topics}
          />
        ))}
    </>
  );
}
