import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import axios from "axios"; // Import axios
import { API_TOPIC } from "@/constants/api";

type AddTopicDialogProps = {
  open: boolean;
  handleClose: () => void;
  onSubmitSuccess: () => void; // Callback để cập nhật dữ liệu sau khi submit
};

export default function AddTopicDialog(props: AddTopicDialogProps) {
  const formRef = React.useRef<HTMLFormElement>(null); // Tạo tham chiếu đến form

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // Tạo FormData để chứa dữ liệu
    console.log(formData);
    try {
      // Gửi yêu cầu POST tới API bằng axios
      const response = await axios.post(`${API_TOPIC}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Đặt Content-Type là multipart/form-data
        },
      });

      console.log("Topic added successfully:", response.data);
      props.onSubmitSuccess(); // Gọi hàm refreshTopics từ props để tải lại danh sách

      // Reset form sau khi thêm thành công
      if (formRef.current) {
        formRef.current.reset(); // Gọi reset() trên formRef
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
          <span className="mr-3">Hình ảnh:</span>
          <input
            required
            name="avatar"
            type="file"
            accept="image/*" // chỉ chấp nhận file ảnh
            style={{ marginTop: "16px" }} // Thêm khoảng cách giữa các input
          />
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
