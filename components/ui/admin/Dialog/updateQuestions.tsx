import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Radio,
} from "@mui/material";
import axios from "axios";
import { API_TOPIC } from "@/constants/api";
import ToastNotification, {
  notifyError,
  notifySuccess,
} from "@/components/ui/toast-notification";

type Answer = {
  id?: number;
  answer: string;
  isTrue: number; // 1 là đúng, 0 là sai
  audioSrc?: File | null; // File âm thanh
  img?: File | null; // File hình ảnh
};

type QuestionFormProps = {
  open: boolean;
  handleClose: () => void;
  initialData: any | null; // Dữ liệu câu hỏi ban đầu
  resetData: () => void;
};

const QuestionForm: React.FC<QuestionFormProps> = ({
  open,
  handleClose,
  initialData,
  resetData,
}) => {
  const [question, setQuestion] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questionAudio, setQuestionAudio] = useState<File | null>(null); // Danh sách đáp án

  // Đồng bộ initialData vào state khi mở dialog
  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.title || "");
      setAnswers(initialData.answers || []);
      setKeyword(initialData.keyword || "");
    }
  }, [initialData]);

  // Cập nhật đáp án đúng (isTrue)
  const handleRadioChange = (index: number) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((ans, i) => ({
        ...ans,
        isTrue: i === index ? 1 : 0,
      }))
    );
  };

  // Cập nhật text đáp án
  const handleTextChange = (index: number, value: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index].answer = value;
      return updatedAnswers;
    });
  };

  // Cập nhật file âm thanh
  const handleAudioChange = (index: number, file: File | null) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index].audioSrc = file;
      return updatedAnswers;
    });
  };

  // Cập nhật file hình ảnh
  const handleImageChange = (index: number, file: File | null) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index].img = file;
      return updatedAnswers;
    });
  };

  // Xử lý submit form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Kiểm tra các trường bắt buộc

    if (
      answers.some(
        (answer) => answer.isTrue === null || answer.isTrue === undefined
      )
    ) {
      notifyError("Cần chỉ rõ đáp án đúng!");
      return;
    }

    const formData = new FormData();

    // Thêm câu hỏi và thông tin cơ bản
    formData.append("question", questionAudio || question);
    formData.append("typeId", initialData?.typeId || "");
    formData.append("keyword", keyword || "");
    formData.append("topicId", initialData?.topicId || "");

    // Thêm các đáp án
    answers.forEach((answer, index) => {
      formData.append(`answers[${index}][text]`, answer.answer);
      formData.append(`answers[${index}][isTrue]`, String(answer.isTrue));
      if (answer.audioSrc) {
        formData.append(`answers[${index}][audio]`, answer.audioSrc);
      }
      if (answer.img) {
        formData.append(`answers[${index}][image]`, answer.img);
      }
      if (answer.id) {
        formData.append(`answers[${index}][id]`, String(answer.id));
      }
    });
    console.log("Data submitted:", Array.from(formData.entries()));
    try {
      const response = await axios.put(
        `${API_TOPIC}/update-question/${initialData?.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        notifySuccess("Cập nhật thành công!");
        resetData(); // Làm mới dữ liệu
        handleClose(); // Đóng dialog
      } else {
        notifyError("Lỗi cập nhật!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      notifyError("Có lỗi xảy ra!");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Cập nhật câu hỏi</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {initialData?.typeName == "reading" ||
            initialData?.typeName == "speaking" ? (
              <TextField
                autoFocus
                required
                margin="dense"
                id="question"
                name="question"
                label="Câu hỏi"
                type="text"
                fullWidth
                variant="standard"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            ) : (
              <>
                {" "}
                <div className="relative">
                  <label className="mr-4">Tải lên audio câu hỏi:</label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const audioFile = e.target.files?.[0] || null;
                      setQuestionAudio(audioFile);
                    }}
                  />
                </div>{" "}
              </>
            )}
            {keyword.length > 0 && (
              <TextField
                autoFocus
                required
                margin="dense"
                id="keyword"
                name="keyword"
                label="Đáp án đúng"
                type="text"
                fullWidth
                variant="standard"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            )}
            {initialData?.typeName == "reading" ? (
              <div className="mt-4">
                {answers.map((answer, index) => (
                  <div key={index} className="space-y-4 mb-4">
                    <div className="flex items-center">
                      <Radio
                        checked={answer.isTrue === 1}
                        onChange={() => handleRadioChange(index)}
                      />
                      <TextField
                        label={`Đáp án ${index + 1}`}
                        name={`answers[${index}].answer`}
                        value={answer.answer}
                        onChange={(e) =>
                          handleTextChange(index, e.target.value)
                        }
                        fullWidth
                        margin="normal"
                        required
                      />
                    </div>

                    {/* Âm thanh */}
                    <div className="flex justify-start items-center gap-4 mb-2">
                      <label>Âm thanh:</label>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) =>
                          handleAudioChange(
                            index,
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                      />
                    </div>

                    {/* Hình ảnh */}
                    <div className="flex justify-start items-center gap-4">
                      <label>Hình ảnh:</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageChange(
                            index,
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4">
                {answers.map((answer, index) => (
                  <div key={index} className="space-y-4 mb-4">
                    <div className="flex items-center">
                      <Radio
                        checked={answer.isTrue === 1}
                        onChange={() => handleRadioChange(index)}
                      />
                      <TextField
                        label={`Đáp án ${index + 1}`}
                        name={`answers[${index}].answer`}
                        value={answer.answer}
                        onChange={(e) =>
                          handleTextChange(index, e.target.value)
                        }
                        fullWidth
                        margin="normal"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="submit" variant="contained" color="primary">
              Cập nhật
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default QuestionForm;
