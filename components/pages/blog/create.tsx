"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import axios from "axios";
import { Button, Dialog, DialogContent, styled } from "@mui/material";
import ToastNotification from "@/components/ui/toast-notification";
import { notifyError, notifySuccess } from "@/components/ui/toast-notification";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { API_BLOG } from "@/constants/api";
import { redirect } from "next/navigation";
import { useUser } from "@/context/user";
interface Blog {
  title: string;
  htmlContent: string;
  description: string;
  avatar: File | undefined;
  avatarTesting: string;
  username: string | undefined;
}

const TextEditor: React.FC = () => {
  const { user } = useUser();
  const [blog, setBlog] = useState<Blog>({
    title: "",
    htmlContent: "",
    avatar: undefined,
    description: "",
    avatarTesting: "",
    username: user?.username,
  });

  const [open, setOpen] = useState<boolean>(false);

  const onChangeValue = (e: any) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const onhtmlContentChange = (content: string, editor: TinyMCEEditor) => {
    setBlog({ ...blog, htmlContent: content });
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      // Kiểm tra nếu tệp là hình ảnh
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setBlog({
            ...blog,
            avatar: file,
            avatarTesting: reader.result as string,
          });
        };

        reader.readAsDataURL(file);
        console.log(blog);
      } else {
        notifyError("Vui lòng chọn file là ảnh");
      }
    }
  };

  const addBlog = async () => {
    if (blog.title.length < 10) {
      notifyError("Tiêu đề phải chứa ít nhất 10 chữ!!");
      return;
    }
    if (blog.description.length < 30) {
      notifyError("Mô tả ngắn phải chứa ít nhất 30 chữ!!");
      return;
    }
    if (!blog.avatar) {
      notifyError("Vui lòng chọn ảnh đại diện");
      return;
    }
    if (blog.htmlContent.length < 100) {
      notifyError("Nội dung phải chứa ít nhất 100 chữ!!");
      return;
    }

    try {
      const res = await axios.post(API_BLOG, blog, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Topic added successfully:", res.data);
      if (res.status === 201) {
        notifySuccess("Viết Blog thành công");
        notifySuccess("Đang chuyển hướng trang");
        setTimeout(() => {
          window.location.href = "http://localhost:3000/web/blog";
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      notifyError("Lỗi không mong muốn vui lòng thử lại");
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <div className="container">
        <div className="">
          <h1 className="mb-4 w-full text-center text-3xl font-extrabold leading-tight text-blue-800 lg:mb-6 lg:text-4xl dark:text-white">
            Viết Blog
          </h1>
          <div className="space-y-4">
            <div className="flex">
              <div className="space-y-4 w-1/2">
                <div className="space-y-4 w-full">
                  <label className="font-bold text-md">Tiêu đề: </label>
                  <textarea
                    rows={2}
                    name="title"
                    value={blog.title}
                    onChange={onChangeValue}
                    className="p-2 rounded-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tiêu đề ..."
                    required
                  />
                </div>
                <div className="flex flex-col space-y-4 w-full">
                  <label className="font-bold text-md">Ảnh đại diện: </label>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Tải ảnh lên
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </Button>
                </div>
                <div className="space-y-4 w-full">
                  <label className="font-bold text-md">Mô tả ngắn: </label>
                  <textarea
                    name="description"
                    value={blog.description}
                    onChange={onChangeValue}
                    className="p-2 rounded-lg w-full  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Mô tả ngắn ..."
                    required
                    rows={8}
                  />
                </div>
              </div>

              <div className="flex w-1/2 justify-center items-center">
                <Card
                  sx={{ maxWidth: 280, maxHeight: 500 }}
                  className="transform transition-transform duration-300 hover:-translate-y-2 mb-6 rounded-2xl"
                >
                  <CardMedia
                    sx={{ height: 180 }}
                    image={blog.avatarTesting}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      className="font-sans line-clamp-2 overflow-hidden whitespace-pre-wrap break-words"
                    >
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="font-sans line-clamp-3 overflow-hidden whitespace-pre-wrap break-words"
                    >
                      {blog.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      className="text-blue-500 hover:bg-gray-200 text-sx"
                    >
                      Chia sẻ
                    </Button>

                    <Button
                      size="small"
                      className="text-blue-500 hover:bg-gray-200 text-sx"
                    >
                      Xem thêm
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-bold text-md">Nội dung: </label>
              <Editor
                apiKey="0ttfa655sq0k18rodu22clwxbb1juf5se76bck6b352uzuc5"
                init={{
                  plugins:
                    "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                  editimage_cors_hosts: ["picsum.photos"],
                  menubar: "file edit view insert format tools table help",
                  toolbar:
                    "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                  autosave_ask_before_unload: true,
                  autosave_interval: "30s",
                  autosave_prefix: "{path}{query}-{id}-",
                  autosave_restore_when_empty: false,
                  autosave_retention: "2m",
                  image_advtab: true,
                  link_list: [
                    { title: "My page 1", value: "https://www.tiny.cloud" },
                    { title: "My page 2", value: "http://www.moxiecode.com" },
                  ],
                  image_list: [
                    { title: "My page 1", value: "https://www.tiny.cloud" },
                    { title: "My page 2", value: "http://www.moxiecode.com" },
                  ],
                  image_class_list: [
                    { title: "None", value: "" },
                    { title: "Some class", value: "class-name" },
                  ],
                  importcss_append: true,
                  file_picker_callback: (callback, value, meta) => {
                    /* Provide file and text for the link dialog */
                    if (meta.filetype === "file") {
                      callback("IMAGE_URL", { alt: "Image Alt Text" });
                    }

                    /* Provide image and alt text for the image dialog */
                    if (meta.filetype === "image") {
                      // Open file picker and upload image to your server
                      // Then call callback with the image URL
                      callback("IMAGE_URL", { alt: "Image Alt Text" });
                    }

                    /* Provide alternative source and posted for the media dialog */
                    if (meta.filetype === "media") {
                      callback("movie.mp4", {
                        source2: "alt.ogg",
                        poster: "https://www.google.com/logos/google.jpg",
                      });
                    }
                  },
                  height: 600,
                  image_caption: true,
                  quickbars_selection_toolbar:
                    "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                  noneditable_class: "mceNonEditable",
                  toolbar_mode: "sliding",
                  contextmenu: "link image table",
                  skin: "oxide",
                  content_css: "default",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                }}
                onEditorChange={onhtmlContentChange}
              />
            </div>
            <div className="mt-4 flex justify-end w-full space-x-2">
              <Button
                variant="contained"
                onClick={() => setOpen(!!blog.htmlContent && !!blog.title)}
              >
                Xem Blog
              </Button>
              <Button variant="contained" onClick={addBlog}>
                Tạo Blog
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth={"lg"}
        fullWidth={true}
      >
        <DialogContent>
          <div className="p-12">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {blog.title}
            </h1>
            <img src={blog.avatarTesting} alt="" className="w-full mb-6" />
            <p className="mb-6">{blog.description}</p>
            <div dangerouslySetInnerHTML={{ __html: blog.htmlContent }} />
          </div>
        </DialogContent>
      </Dialog>

      <ToastNotification />
    </>
  );
};

export default TextEditor;
