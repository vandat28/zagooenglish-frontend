"use client";
import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";
const SidebarMobile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const settings = [
    { url: "/web", name: "Trang chủ" },
    { url: "/web/learning", name: "Đổi chủ đề" },
  ];
  const id = 1;
  return (
    <>
      <div
        className=" xl:hidden text-gray-700 bg-white p-2 rounded-md hover:bg-gray-120 cursor-pointer relative"
        onClick={handleOpen}
      >
        <Tooltip title="Chọn chủ đề" placement="right">
          {!open ? (
            <MenuIcon sx={{ fontSize: 30 }} />
          ) : (
            <CloseIcon sx={{ fontSize: 30 }} />
          )}
        </Tooltip>
        {open && (
          <div className="bg-white rounded-xl absolute top-12 right-0 w-40 shadow-lg text-gray-600 ">
            {settings.map((setting) => (
              <Link href={setting.url} key={setting.name}>
                <MenuItem>
                  <Typography
                    textAlign="center"
                    fontSize="14px"
                    fontWeight="500"
                  >
                    {setting.name}
                  </Typography>
                </MenuItem>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarMobile;
