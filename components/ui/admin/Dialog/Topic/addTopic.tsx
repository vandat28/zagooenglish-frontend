import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios"; // Import axios
import { API_TOPIC, UPLOAD_DOMAIN } from "@/constants/api";
import ToastNotification, {
  notifySuccess,
} from "@/components/ui/toast-notification";

type AddTopicDialogProps = {
  open: boolean;
  data: any[] | undefined;
  handleClose: () => void;
  onSubmitSuccess: () => void; // Callback để cập nhật dữ liệu sau khi submit
};

export default function AddTopicDialog(props: AddTopicDialogProps) {
  const formRef = React.useRef<HTMLFormElement>(null); // Tạo tham chiếu đến form
  const [imagePreview, setImagePreview] = React.useState<string | null>(null); // State để lưu URL hình ảnh

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Cập nhật state với URL hình ảnh
      };
      reader.readAsDataURL(file); // Đọc file ảnh
    }
  };

  console.log(props.data);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // Tạo FormData để chứa dữ liệu
    console.log(formData.get("name")?.toString().trim());
    // Kiểm tra trùng lặp tên
    const newTopicName = formData.get("name")?.toString().trim().toLowerCase();
    const isDuplicate = props.data?.some(
      (topic) => topic.name.toLowerCase() === newTopicName
    );

    if (isDuplicate) {
      alert("Tên chủ đề đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }
    try {
      // Gửi yêu cầu POST tới API bằng axios
      const response = await axios.post(`${API_TOPIC}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Đặt Content-Type là multipart/form-data
        },
      });

      console.log("Topic added successfully:", response.data);
      props.onSubmitSuccess(); // Gọi hàm refreshTopics từ props để tải lại danh sách
      notifySuccess("Thêm mới thành công");
      // Reset form sau khi thêm thành công
      if (formRef.current) {
        formRef.current.reset(); // Gọi reset() trên formRef
        setImagePreview(null); // Reset preview hình ảnh
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to add topic:", error.response?.data);
      } else {
        console.error("Error occurred while adding topic:", error);
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        PaperProps={{
          component: "form",
          ref: formRef, // Gán ref cho form
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>Thêm chủ đề</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="name"
            label="Tên chủ đề"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="label"
            label="Nhãn"
            type="text"
            fullWidth
            variant="standard"
          />
          <div className="flex justify-start items-center gap-4 my-4">
            <span>Hình ảnh:</span>
            <input
              required
              name="avatar"
              type="file"
              accept="image/*" // chỉ chấp nhận file ảnh
              onChange={handleImageChange} // Thêm sự kiện thay đổi
              // Thêm khoảng cách giữa các input
            />
          </div>
          <div className="flex justify-center items-center">
            {imagePreview && ( // Hiển thị hình ảnh nếu có
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-20" // Căn chỉnh và thêm khoảng cách
              />
            )}
          </div>

          <FormControl variant="filled" sx={{ width: "100%", mt: 3 }}>
            <InputLabel id="demo-simple-select-filled-label">Cấp độ</InputLabel>
            <Select
              required
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="level"
              fullWidth
            >
              <MenuItem value="1">Sơ cấp</MenuItem>
              <MenuItem value="2">Trung cấp</MenuItem>
              <MenuItem value="3">Cao cấp</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Hủy</Button>
          <Button type="submit">Lưu</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
