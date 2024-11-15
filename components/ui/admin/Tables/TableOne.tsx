"use client";
import { fetcher } from "@/api/fetcher";
import BlogDetailDialog from "@/components/ui/admin/Dialog/blogdetail";
import { API_BLOG_LIST, UPLOAD_DOMAIN } from "@/constants/api";
import { User } from "@/types/User";
import {
  Box,
  Button,
  IconButton,
  NativeSelect,
  Pagination,
  TextField,
  Tooltip,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useState } from "react";
import useSWR from "swr";
import PaginationControlled from "@/components/ui/pagination";

type TableOneProps = {
  user: User | null;
};

function removeAccents(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

const TableOne = (props: TableOneProps) => {
  let { data, error, isLoading, mutate } = useSWR<Blog[]>(
    `${API_BLOG_LIST}`,
    fetcher
  );

  if (props.user?.role == "User")
    data = data?.filter((blog) => blog.username == props.user?.username);

  const [open, setOpen] = useState(false);
  const [blogDetail, setBlogDetail] = useState<Blog | undefined>(undefined);

  const onOpen = (blogDetail: Blog) => {
    setBlogDetail(blogDetail);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const resetData = () => {
    mutate();
  };
  const [filter, setFilter] = useState<number | string>(2);

  const [searchCondition, setSearchCondition] = useState<string | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;

  const searchedItems = data?.filter((e) => {
    if (!searchCondition) return true;
    const normalizedSearchCondition = removeAccents(
      searchCondition.toLowerCase().trim()
    );
    const normalizedName = removeAccents(e.title.toLowerCase());

    return normalizedName.includes(normalizedSearchCondition);
  });

  const filteredItems = searchedItems?.filter((e) => {
    return filter == 2 ? true : e.status == filter;
  });

  const totalPages = Math.ceil(
    filteredItems ? filteredItems.length / itemsPerPage : 0
  );

  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);

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
            <InputLabel id="demo-simple-select-filled-label">
              Trạng thái
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={filter}
              onChange={(e) => {
                setCurrentPage(1);
                setFilter(e.target.value);
              }}
            >
              <MenuItem value={2}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Đã duyệt</MenuItem>
              <MenuItem value={0}>Chưa duyệt</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {props.user?.role == "User" ? "BLOG CỦA TÔI" : "BLOG"}
          {data?.length == 0 ? ": Bạn chưa viết Blog nào" : ""}
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-9">
            <div className="p-2.5 xl:p-5 col-span-3">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tiêu đề
              </h5>
            </div>
            <div className="p-2.5 xl:p-5 col-span-3">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Mô tả ngắn
              </h5>
            </div>
            {props.user?.role !== "User" && (
              <div className="p-2.5 xl:p-5 col-span-1">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Người viết
                </h5>
              </div>
            )}
            <div className="hidden p-2.5 text-center sm:block xl:p-5 col-span-1">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Trạng thái
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5 col-span-1">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {currentItems &&
            currentItems.map((blog, key) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-9 ${
                  key === currentItems.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5 col-span-3">
                  <div className="flex-shrink-0">
                    <img
                      src={`${UPLOAD_DOMAIN}/${blog.img}`}
                      alt="Brand"
                      width={52}
                      height={52}
                    />
                  </div>
                  <p className="hidden text-black dark:text-white sm:block">
                    {blog.title}
                  </p>
                </div>

                <div className="flex items-center p-2.5 xl:p-5 col-span-3">
                  <p className="text-black dark:text-white line-clamp-2">
                    {blog.description}
                  </p>
                </div>
                {props.user?.role !== "User" && (
                  <div className="flex items-center p-2.5 xl:p-5 col-span-1 ">
                    <p className="text-meta-3 line-clamp-1">{blog.username}</p>
                  </div>
                )}

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 col-span-1">
                  <p className="text-black dark:text-white">
                    {blog.status == 1 ? (
                      <Button variant="outlined" color="success" size="small">
                        Đã duyệt
                      </Button>
                    ) : (
                      <Button variant="outlined" color="error" size="small">
                        Chưa duyệt
                      </Button>
                    )}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 col-span-1">
                  <IconButton
                    className="hover:text-green-600"
                    onClick={() => onOpen(blog)}
                  >
                    <Tooltip title="Chi tiết blog" placement="top">
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
                  </IconButton>
                </div>
              </div>
            ))}
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
          <PaginationControlled
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <BlogDetailDialog
          onClose={onClose}
          open={open}
          blog={blogDetail}
          resetData={resetData}
          userRole={props.user?.role}
        />
      </div>
    </>
  );
};

export default TableOne;
