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
  notifyError,
  notifySuccess,
} from "@/components/ui/toast-notification";

type UpdateTopicDialogProps = {
  open: boolean;
  handleClose: () => void;
  onSubmitSuccess: () => void; // Callback to refresh data after update
  topicData: any;
};

export default function UpdateTopicDialog(props: UpdateTopicDialogProps) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const response = await axios.put(
        `${API_TOPIC}/${props.topicData.id}`, // API call for updating topic
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Topic updated successfully:", response.data);
      props.onSubmitSuccess();
      props.handleClose();
      notifySuccess("Cập nhật thành công");
      if (formRef.current) {
        formRef.current.reset();
        setImagePreview(null);
      }
    } catch (error) {
      notifyError("Cập nhật thất bại xin thử lại");
      if (axios.isAxiosError(error)) {
        console.error("Failed to update topic:", error.response?.data);
      } else {
        console.error("Error occurred while updating topic:", error);
      }
    }
  };

  console.log(props.topicData);
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        PaperProps={{
          component: "form",
          ref: formRef,
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>Cập nhật chủ đề</DialogTitle>
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
            defaultValue={props.topicData.name} // Pre-fill data
          />
          <TextField
            required
            margin="dense"
            name="label"
            label="Nhãn"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={props.topicData.label} // Pre-fill data
          />
          <div className="flex justify-start items-center gap-4 my-4">
            <span>Hình ảnh:</span>
            <input
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              src={imagePreview || `${UPLOAD_DOMAIN}/${props.topicData.img}`}
              alt="Preview"
              className="max-h-20"
            />
          </div>
          <FormControl variant="filled" sx={{ width: "100%", mt: 3 }}>
            <InputLabel id="demo-simple-select-filled-label">Cấp độ</InputLabel>
            <Select
              required
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="level"
              fullWidth
              defaultValue={props.topicData.levelId} // Pre-fill data
            >
              <MenuItem value="1">Sơ cấp</MenuItem>
              <MenuItem value="2">Trung cấp</MenuItem>
              <MenuItem value="3">Cao cấp</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Hủy</Button>
          <Button type="submit">Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
