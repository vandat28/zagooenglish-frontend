import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { API_BLOG, UPLOAD_DOMAIN } from "@/constants/api";

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type BlogDetailDialogProps = {
  open: boolean;
  onClose: () => void;
  blog?: Blog;
  resetData: () => void;
  userRole: string | null | undefined;
};

export default function BlogDetailDialog(props: BlogDetailDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isApproved, setIsApproved] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseBlogDetail = () => {
    setIsApproved(false);
    props.onClose();
  };

  const handleUpdate = async () => {
    try {
      // Gọi API để duyệt bài và cập nhật status thành 1
      const response = await axios.put(`${API_BLOG}/status/${props.blog?.id}`);
      if (response.status === 200) {
        handleClose();
        setIsApproved(true);
        props.resetData();
      }
    } catch (error) {
      console.error("Error approving blog:", error);
    }
  };
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={props.open}
        onClose={() => {
          props.onClose;
          setIsApproved(false);
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography
              sx={{
                ml: 2,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="h6"
              component="div"
            >
              Chi tiết Blog: {props.blog?.title}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseBlogDetail}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {props.blog && (
          <div className="flex flex-col xl:flex-row justify-between p-8 mx-auto max-w-screen-xl bg-white rounded-xl gap-y-6 ">
            <article className="w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  {props.blog.title}
                </h1>
              </header>
              <img
                src={`${UPLOAD_DOMAIN}/${props.blog.img}`}
                alt=""
                className="w-full mb-6"
              />
              <p className="mb-6 font-semibold">{props.blog.description}</p>
              <div
                className="mt-6 font-normal"
                dangerouslySetInnerHTML={{ __html: props.blog.content }}
              ></div>
              <div className="mt-8 text-right bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-600 text-lg font-thin italic">
                  <span className="mr-2">✍️</span> Người viết:
                  <span className="text-blue-500 ml-2">
                    {props.blog.username}
                  </span>
                </p>
              </div>
              {props.userRole !== "User" && (
                <div className="mt-8 text-right">
                  {" "}
                  {props.blog.status == 1 || isApproved ? (
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      disabled
                      sx={{
                        backgroundColor: "green", // Màu nền khi disable
                        color: "white", // Màu chữ khi disable
                        "&.Mui-disabled": {
                          backgroundColor: "green", // Vẫn giữ màu xanh lá khi disable
                          color: "white", // Vẫn giữ màu chữ
                        },
                      }}
                    >
                      Đã duyệt
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      Duyệt Blog này
                    </Button>
                  )}
                </div>
              )}
            </article>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {`Bạn có muốn duyệt Blog này?`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Hãy nhấn đồng ý nếu bạn muốn mọi người thấy bài viết.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Không đồng ý</Button>
                <Button onClick={handleUpdate} autoFocus>
                  Đồng ý
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
}
