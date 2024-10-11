"use client";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import Pagination from "@/components/ui/pagination";
import NativeSelect from "@mui/material/NativeSelect";
import AddTopicDialog from "@/components/ui/admin/Dialog/Topic/addTopic";
import useSWR from "swr";
import { fetcher } from "@/api/fetcher";
import { API_DOMAIN, API_TOPIC } from "@/constants/api";
import QuestionsManagementDialog from "@/components/ui/admin/Dialog/questions";

function removeAccents(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

const TableThree = () => {
  const { data, error, isLoading, mutate } = useSWR<any[]>(
    `${API_TOPIC}`,
    fetcher
  );
  // Hàm để cập nhật danh sách sau khi thêm thành công
  const refreshTopics = () => {
    mutate(); // Gọi mutate để reload dữ liệu từ API
  };
  const topicsData = data?.map((e, i) => {
    return { no: i + 1, ...e };
  });

  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [topicId, setTopicId] = useState(undefined);
  const [openQuestions, setOpenQuestions] = useState(false);
  const [searchCondition, setSearchCondition] = useState<string | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;

  const searchedItems = topicsData?.filter((e) => {
    if (!searchCondition) return true;
    const normalizedSearchCondition = removeAccents(
      searchCondition.toLowerCase().trim()
    );
    const normalizedName = removeAccents(e.name.toLowerCase());

    return normalizedName.includes(normalizedSearchCondition);
  });

  const filteredItems = searchedItems?.filter((e) =>
    filter === "" ? true : e.levelId == filter
  );

  const totalPages = Math.ceil(
    filteredItems ? filteredItems.length / itemsPerPage : 0
  );

  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);

  const handleClose = () => {
    setOpen(false);
  };

  const onClose = () => {
    setOpenQuestions(false);
  };

  return (
    <>
      <div className="mb-4 flex gap-2">
        <TextField
          id="filled-search"
          label="Tìm kiếm"
          type="search"
          variant="filled"
          onChange={(e) => {
            setCurrentPage(1);
            setSearchCondition(e.target.value ?? undefined);
          }}
        />
        <Box sx={{ minWidth: 150 }}>
          <FormControl variant="filled" sx={{ minWidth: 150 }}>
            <InputLabel id="demo-simple-select-filled-label">Cấp độ</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={filter}
              onChange={(e) => {
                setCurrentPage(1);
                setFilter(e.target.value);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="1">Sơ cấp</MenuItem>
              <MenuItem value="2">Trung cấp</MenuItem>
              <MenuItem value="3">Cao cấp</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Thêm chủ đề
        </Button>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  No.
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Hình ảnh
                </th>
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Tên chủ đề
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Cấp độ
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Nhãn
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((topic, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {topic.no}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <img
                      src={`${API_DOMAIN}/uploads/${topic.img}`}
                      className="w-14 rounded-full" // Thêm h-20 để đảm bảo chiều cao bằng chiều rộng
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-bold text-black dark:text-white">
                      {topic.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {topic.levelName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{topic.label}</p>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-rose-500">
                        <Tooltip title="Xóa" placement="top">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Tooltip>
                      </button>
                      <button className="hover:text-primary">
                        <Tooltip title="Chỉnh sửa" placement="top">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-5 "
                          >
                            <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                          </svg>
                        </Tooltip>
                      </button>
                      <button
                        className="hover:text-green-600"
                        onClick={() => {
                          setTopicId(topic.id);
                          setOpenQuestions(true);
                        }}
                      >
                        <Tooltip title="Chi tiết chủ đề" placement="top">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-5"
                          >
                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            <path
                              fillRule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Tooltip>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=" my-4 flex justify-end">
          <Box sx={{ minWidth: 20 }}>
            <FormControl fullWidth>
              <NativeSelect
                onChange={(e) => {
                  setCurrentPage(1);
                  setItemsPerPage(parseInt(e.target.value));
                }}
                defaultValue={10}
                inputProps={{
                  name: "itemsPerPage",
                  id: "uncontrolled-native",
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <AddTopicDialog
        open={open}
        handleClose={handleClose}
        onSubmitSuccess={refreshTopics}
      />
      <QuestionsManagementDialog
        open={openQuestions}
        onClose={onClose}
        topicId={topicId}
      />
    </>
  );
};

export default TableThree;
