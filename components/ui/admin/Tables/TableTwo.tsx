"use client";
import PaginationControlled from "@/components/ui/pagination";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import NativeSelect from "@mui/material/NativeSelect";
import useSWR from "swr";
import { API_USER_LIST, API_USER_ROLE } from "@/constants/api";
import { fetcher } from "@/api/fetcher";
import { User } from "@/types/User";
import ToastNotification, {
  notifySuccess,
} from "@/components/ui/toast-notification";
import axios from "axios";

const TableTwo = () => {
  const { data, error, isLoading, mutate } = useSWR<User[]>(
    `${API_USER_LIST}`,
    fetcher
  );

  const usersData = data?.map((e, i) => {
    return { no: i + 1, ...e };
  });
  const [filter, setFilter] = useState("");
  // const [open, setOpen] = useState(false);
  const [searchCondition, setSearchCondition] = useState<string | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;

  const searchedItems = usersData?.filter((e) =>
    !searchCondition
      ? true
      : e.username
      ? e.username.toLowerCase().includes(searchCondition.toLowerCase().trim())
      : ""
  );

  const filteredItems = searchedItems?.filter((e) =>
    filter === "" ? true : e.role === filter
  );

  const totalPages = Math.ceil(
    filteredItems ? filteredItems.length / itemsPerPage : 0
  );

  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);

  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState("");

  const handleClickOpen = (username: string) => {
    setOpen(true);
    setUserId(username);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateRole = async () => {
    try {
      // Gọi API để cập nhật role cho người dùng
      const response = await axios.put(`${API_USER_ROLE}/${userId}`, {
        role: "Admin",
      });

      // Thông báo thành công hoặc xử lý kết quả sau khi cập nhật
      console.log("Cập nhật quyền thành công:", response.data);

      // Đóng dialog sau khi hoàn tất
      handleClose();
      notifySuccess("Cấp quyền thành công");
      mutate();
    } catch (error) {
      console.error("Lỗi cập nhật quyền:", error);
    }
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
            <InputLabel id="demo-simple-select-filled-label">
              Vai trò
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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Người dùng
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">No.</p>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Tài khoản</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Vai trò</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Tên người dùng</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {currentItems?.map((user, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{user.no}</p>
            </div>
            <div className="col-span-3 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {user.username}
              </p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{user.role}</p>
            </div>
            <div className="col-span-2 flex items-center">
              {user.fullname ? (
                <p className="text-sm text-green-500 dark:text-white">
                  {user.fullname}
                </p>
              ) : (
                <p className="text-sm text-blue-300 dark:text-white">
                  Chưa cập nhật
                </p>
              )}
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <IconButton
                className="text-sm hover:text-meta-3 cursor-pointer"
                disabled={user.role === "Admin"}
                onClick={() => handleClickOpen(user.username)}
              >
                <Tooltip title="Cấp quyền admin" placement="top">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.339 2.237a.531.531 0 0 0-.678 0 11.947 11.947 0 0 1-7.078 2.75.5.5 0 0 0-.479.425A12.11 12.11 0 0 0 2 7c0 5.163 3.26 9.564 7.834 11.257a.48.48 0 0 0 .332 0C14.74 16.564 18 12.163 18 7c0-.538-.035-1.069-.104-1.589a.5.5 0 0 0-.48-.425 11.947 11.947 0 0 1-7.077-2.75ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Tooltip>
              </IconButton>
            </div>
          </div>
        ))}
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
      </div>
      <ToastNotification />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Bạn có muốn hoạt động chủ đề?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn cấp quyền Admin cho {userId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không đồng ý</Button>
          <Button onClick={updateRole} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableTwo;
