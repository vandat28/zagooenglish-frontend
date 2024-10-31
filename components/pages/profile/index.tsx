"use client";
import { CircularProgressWithLabel } from "@/components/ui/process-bar";
import {
  API_DOMAIN,
  API_PROCESS,
  API_USER_UPDATE_FULLNAME,
} from "@/constants/api";
import { useUser } from "@/context/user";
import { Button, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TableOne from "@/components/ui/admin/Tables/TableOne";

const UserProfile = () => {
  const [data, setData] = useState<Topic[]>([]);
  const { user, refreshUser } = useUser();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getData(user?.username);
  }, [user]);

  const getData = async (cookieUser: any) => {
    try {
      const response = await axios.get(`${API_PROCESS}/${cookieUser}`);
      if (response.data) {
        setData(response.data);
        console.log(response.data);
        console.log("name", cookieUser);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const filteredData = data.filter((item) => item.progress > 0);
  const completeTopic = data.filter((item) => item.progress == 100).length;

  async function updateFullname(username: string, newFullName: string) {
    try {
      const response = await axios.put(
        `${API_USER_UPDATE_FULLNAME}/${username}`,
        {
          fullname: newFullName,
        }
      );
      refreshUser();
      console.log(response.data.message);
    } catch (error) {
      console.error("Error updating fullname:", error);
    }
  }

  return (
    <>
      {" "}
      <div className="flex flex-col items-center md:flex-row  gap-8 md:p-20 font-medium">
        <div className="flex flex-col items-center md:w-1/3">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <img
              src={
                user?.avatar ||
                `https://dinoenglish.app/_next/image?url=%2Fassets%2Fdrawable%2Fic_default_ava_male.png&w=1920&q=75`
              }
              alt="User Avatar"
              className="rounded-full"
            />
          </div>

          <p className="mt-2 text-gray-500 text-center">
            Nơi lưu tiến trình học của
          </p>
          <div className=" flex gap-1 mt-2">
            {" "}
            <p className="text-gray-500 text-center">
              {user?.fullname || user?.username}
            </p>
            <button
              className="text-sm hover:text-meta-3 cursor-pointer"
              // disabled={user.role === "Admin"}
              onClick={handleClickOpen}
            >
              <Tooltip title="Đổi tên" placement="right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Tooltip>
            </button>
          </div>
        </div>
        <div className="overflow-hidden w-full md:w-2/3 flex flex-col lg:grow">
          <div className="w-full">
            <h2 className="text-2xl font-medium mb-4">Gần đây</h2>
            <div className="w-full max-w-full flex flex-nowrap gap-3 my-4 overflow-auto h-24 scroll-container">
              {filteredData.length < 1 ? (
                <p>Bạn chưa học chủ đề nào</p>
              ) : (
                filteredData.map((element: Topic, index: number) => (
                  <div
                    key={index}
                    className="w-16 h-16 bg-white p-1 flex justify-center items-center rounded-full "
                  >
                    <CircularProgressWithLabel
                      value={element.progress}
                      size={64}
                    >
                      <img
                        src={`${API_DOMAIN}/uploads/${element.img}`}
                        className="w-14"
                      />
                    </CircularProgressWithLabel>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-full text-xl">
            <h2 className="text-2xl font-medium mb-4">Tiến độ học</h2>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Tổng kinh nghiệm</span>
              <span className="text-yellow-500">369 exp</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Chủ đề đã hoàn thành</span>
              <span className="text-blue-500">
                {completeTopic}/{data.length}
              </span>
            </div>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const fullName = formJson.fullName;
              console.log(fullName);
              if (user?.username) updateFullname(user.username, fullName);
              handleClose();
            },
          }}
          maxWidth="xs"
          fullWidth={true}
        >
          <DialogTitle>Đổi tên</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="fullName"
              label="Tên của bạn"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={user?.fullname || user?.username}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="submit">Cập nhật</Button>
          </DialogActions>
        </Dialog>
      </div>
      {user?.role == "User" && <TableOne user={user} />}
    </>
  );
};

export default UserProfile;
