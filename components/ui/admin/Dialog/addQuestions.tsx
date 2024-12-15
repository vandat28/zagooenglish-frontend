import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Tabs,
  Tab,
  TextField,
  Button,
  Radio,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { API_DOMAIN, API_TOPIC_ADD_QUESTION } from "@/constants/api";
import ToastNotification, {
  notifyError,
  notifySuccess,
} from "@/components/ui/toast-notification";

type AddQuestionTabsProps = {
  topicId: number | undefined;
  resetData: () => void;
};

const AddQuestionTabs = (props: AddQuestionTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  // State cho từng dạng câu hỏi
  const [questionText, setQuestionText] = useState<string>(""); // Text câu hỏi cho Speaking, Reading, Writing
  const [questionAudio, setQuestionAudio] = useState<File | null>(null); // Audio câu hỏi cho Listening

  const [questionAudioUrl, setQuestionAudioUrl] = useState<string | null>(null);

  const [answers, setAnswers] = useState<
    { text: string; audio?: File | null; image?: File | null }[]
  >([
    { text: "", audio: null, image: null },
    { text: "", audio: null, image: null },
    { text: "", audio: null, image: null },
    { text: "", audio: null, image: null },
  ]);

  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null); // Đáp án đúng cho Listening và Reading
  const [writingAnswers, setWritingAnswers] = useState<
    { answer: string; correct: boolean; audio?: File | null }[]
  >([{ answer: "", correct: false, audio: null }]);

  const [keyword, setKeyword] = useState<string>(""); // Input cho từ khóa keyword

  useEffect(() => {
    setQuestionText("");
    setAnswers([
      { text: "", audio: null, image: null },
      { text: "", audio: null, image: null },
      { text: "", audio: null, image: null },
      { text: "", audio: null, image: null },
    ]);
    setKeyword("");
  }, [activeTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setQuestionText(""); // Reset question text when changing tabs
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].text = value;
    setAnswers(updatedAnswers);
  };

  const handleFileChange = (
    index: number,
    field: "audio" | "image",
    file: File | null
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index][field] = file;
    setAnswers(updatedAnswers);
  };

  const handleWritingAnswerChange = (index: number, value: string) => {
    const updatedWritingAnswers = [...writingAnswers];
    updatedWritingAnswers[index].answer = value;
    setWritingAnswers(updatedWritingAnswers);
  };

  const handleWritingCorrectChange = (index: number) => {
    const updatedWritingAnswers = [...writingAnswers];
    updatedWritingAnswers[index].correct =
      !updatedWritingAnswers[index].correct;
    setWritingAnswers(updatedWritingAnswers);
  };

  const handleWritingAudioChange = (index: number, file: File | null) => {
    const updatedWritingAnswers = [...writingAnswers];
    updatedWritingAnswers[index].audio = file;
    setWritingAnswers(updatedWritingAnswers);
  };

  const addWritingAnswer = () => {
    setWritingAnswers([
      ...writingAnswers,
      { answer: "", correct: false, audio: null },
    ]);
  };

  const removeWritingAnswer = (index: number) => {
    const updatedWritingAnswers = writingAnswers.filter((_, i) => i !== index);
    setWritingAnswers(updatedWritingAnswers);
  };

  const handleSubmit = async () => {
    // Kiểm tra tất cả các input không được bỏ trống
    if (activeTab === 0 && !questionAudio) {
      alert("Bạn phải tải lên audio cho câu hỏi Listening.");
      return;
    }
    if (activeTab === 1 && (!questionText || !keyword)) {
      alert("Bạn phải nhập câu hỏi và từ khóa cho câu hỏi Speaking.");
      return;
    }
    if (activeTab === 2) {
      const allFilesSelected = answers.every(
        (answer) => answer.audio && answer.image
      );
      if (!allFilesSelected) {
        alert(
          "Vui lòng chọn tất cả các file audio và hình ảnh cho từng đáp án trong tab Reading."
        );
        return;
      }
    }
    if (
      activeTab === 2 &&
      (!questionText ||
        answers.length !== 4 ||
        answers.some((answer) => !answer.text))
    ) {
      alert("Bạn phải nhập câu hỏi và chính xác 4 đáp án cho câu hỏi Reading.");
      return;
    }
    if (
      activeTab === 3 &&
      (!questionText ||
        !keyword ||
        writingAnswers.some((answer) => !answer.answer))
    ) {
      alert(
        "Bạn phải nhập câu hỏi, từ khóa và tất cả các đáp án cho câu hỏi Writing."
      );
      return;
    }

    const formData = new FormData(); // Tạo FormData

    // Thêm thông tin chung với kiểm tra cho topicId
    if (props.topicId !== undefined) {
      formData.append("topicId", props.topicId.toString()); // Chuyển đổi thành string
    } else {
      alert("topicId không hợp lệ.");
      return;
    }

    if (activeTab === 0) {
      formData.append("typeId", "1");

      // Thêm file audio cho câu hỏi
      if (questionAudio) {
        formData.append("question", questionAudio); // Thêm file audio
      }

      const validAnswers = answers.filter(
        (answer) => answer.text.trim() !== ""
      );

      if (validAnswers.length !== 4) {
        alert("Phải có chính xác 4 đáp án cho phần Listening.");
        return;
      }

      if (!validAnswers.some((_, index) => correctAnswer === index)) {
        alert("Phải có một đáp án được đánh dấu là đúng trong phần Listening.");
        return;
      }

      validAnswers.forEach((answer, index) => {
        formData.append(`answers[${index}][text]`, answer.text);
        formData.append(
          `answers[${index}][isTrue]`,
          correctAnswer === index ? "1" : "0"
        );
        if (answer.audio) {
          formData.append(`answers[${index}][audio]`, answer.audio); // Thêm file audio nếu có
        }
        if (answer.image) {
          formData.append(`answers[${index}][image]`, answer.image); // Thêm file hình ảnh nếu có
        }
      });
    } else if (activeTab === 1) {
      formData.append("typeId", "3");
      formData.append("question", questionText.trim());
      formData.append("keyword", keyword.trim());
    } else if (activeTab === 2) {
      formData.append("typeId", "2");
      formData.append("question", questionText.trim());

      const validAnswers = answers.filter(
        (answer) => answer.text.trim() !== ""
      );

      if (validAnswers.length !== 4) {
        alert("Phải có chính xác 4 đáp án cho phần Reading.");
        return;
      }

      if (!validAnswers.some((_, index) => correctAnswer === index)) {
        alert("Phải có một đáp án được đánh dấu là đúng trong phần Reading.");
        return;
      }

      validAnswers.forEach((answer, index) => {
        formData.append(`answers[${index}][text]`, answer.text);
        formData.append(
          `answers[${index}][isTrue]`,
          correctAnswer === index ? "1" : "0"
        );
        if (answer.audio) {
          formData.append(`answers[${index}][audio]`, answer.audio); // Thêm file audio nếu có
        }
        if (answer.image) {
          formData.append(`answers[${index}][image]`, answer.image); // Thêm file hình ảnh nếu có
        }
      });
    } else if (activeTab === 3) {
      formData.append("typeId", "4");
      formData.append("question", questionText.trim());
      formData.append("keyword", keyword.trim());

      const validWritingAnswers = writingAnswers.filter(
        (writingAnswer) => writingAnswer.answer.trim() !== ""
      );

      if (validWritingAnswers.length === 0) {
        alert("Phải có ít nhất một đáp án trong phần Writing.");
        return;
      }

      if (!validWritingAnswers.some((answer) => answer.correct)) {
        alert(
          "Phải có ít nhất một đáp án được đánh dấu là đúng trong phần Writing."
        );
        return;
      }
      // if (validWritingAnswers.some((answer) => !answer.audio)) {
      //   alert("Phải nhập file âm thanh cho đáp án trong phần Writing.");
      //   return;
      // }

      validWritingAnswers.forEach((writingAnswer, index) => {
        formData.append(`answers[${index}][text]`, writingAnswer.answer);
        formData.append(
          `answers[${index}][isTrue]`,
          writingAnswer.correct ? "1" : "0"
        );
        if (writingAnswer.audio) {
          formData.append(`answers[${index}][audio]`, writingAnswer.audio); // Thêm file audio nếu có
        }
      });
    }

    console.log("Data submitted:", Array.from(formData.entries())); // Hiển thị dữ liệu để kiểm tra

    try {
      // Gửi dữ liệu đến backend
      const response = await axios.post(`${API_TOPIC_ADD_QUESTION}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Chỉ định Content-Type cho FormData
        },
      });
      console.log("Data submitted successfully:", response.data);
      resetForm();
      props.resetData();
      notifySuccess("Thành công");
    } catch (error) {
      console.error("Error submitting data:", error);
      notifyError("Lỗi không mong muốn vui lòng thử lại");
    }
  };

  const resetForm = () => {
    setQuestionText("");
    setQuestionAudio(null);
    setQuestionAudioUrl(null);
    setAnswers([
      { text: "", audio: null, image: null },
      { text: "", audio: null, image: null },
      { text: "", audio: null, image: null },
      { text: "", audio: null, image: null },
    ]);
    setCorrectAnswer(null);
    setWritingAnswers([{ answer: "", correct: false, audio: null }]);
    setKeyword("");
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div className="w-full">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Question Type Tabs"
        className="mb-4"
      >
        <Tab label="Listening" />
        <Tab label="Speaking" />
        <Tab label="Reading" />
        <Tab label="Writing" />
      </Tabs>

      {/* Listening Tab */}
      {activeTab === 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Thêm câu hỏi Listening</h2>
          <div className="relative">
            <label className="mr-4">Tải lên audio câu hỏi:</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const audioFile = e.target.files?.[0] || null;
                setQuestionAudio(audioFile);

                // Tạo URL cho file audio vừa chọn
                if (audioFile) {
                  if (questionAudioUrl) {
                    URL.revokeObjectURL(questionAudioUrl); // Giải phóng URL cũ nếu có
                  }
                  const audioUrl = URL.createObjectURL(audioFile);
                  setQuestionAudioUrl(audioUrl); // Lưu URL vào state
                  playAudio(audioUrl); // Gọi hàm playAudio để phát âm thanh ngay sau khi chọn file
                }
              }}
            />
            {/* Nút bấm để phát âm thanh */}
            {questionAudioUrl && (
              <span className="absolute right-0">
                <IconButton
                  onClick={() => playAudio(questionAudioUrl)}
                  aria-label="play audio"
                >
                  <VolumeUpIcon />
                </IconButton>
              </span>
            )}
          </div>

          <div className="mt-4">
            {answers.map((answer, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center">
                  <Radio
                    checked={correctAnswer === index}
                    onChange={() => setCorrectAnswer(index)}
                  />
                  <TextField
                    label={`Đáp án ${index + 1}`}
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Speaking Tab */}
      {activeTab === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Thêm câu hỏi Speaking</h2>
          <TextField
            label="Câu hỏi"
            fullWidth
            margin="normal"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <TextField
            label="Đáp án đúng"
            fullWidth
            margin="normal"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      )}

      {/* Reading Tab */}
      {activeTab === 2 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Thêm câu hỏi Reading</h2>
          <TextField
            label="Câu hỏi"
            fullWidth
            margin="normal"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <div className="mt-4">
            {answers.map((answer, index) => (
              <div key={index} className="space-y-4 mb-4">
                <div className="flex items-center">
                  <Radio
                    checked={correctAnswer === index}
                    onChange={() => setCorrectAnswer(index)}
                  />
                  <TextField
                    label={`Đáp án ${index + 1}`}
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </div>
                <div className="flex justify-start items-center gap-4">
                  <label>Âm thanh:</label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) =>
                      handleFileChange(
                        index,
                        "audio",
                        e.target.files?.[0] || null
                      )
                    }
                  />

                  {/* Nghe trước âm thanh nếu đã tải lên */}
                  {answer.audio && (
                    <IconButton
                      onClick={() => {
                        const audioSrc = URL.createObjectURL(
                          answer.audio as Blob
                        );
                        const audio = new Audio(audioSrc);
                        audio.play();
                      }}
                      aria-label="play audio"
                    >
                      <VolumeUpIcon />
                    </IconButton>
                  )}
                </div>
                <div className="flex justify-start items-center gap-4">
                  <label>Hình ảnh:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(
                        index,
                        "image",
                        e.target.files?.[0] || null
                      )
                    }
                  />
                  {/* Xem trước hình ảnh nếu đã tải lên */}
                  {answer.image && (
                    <img
                      src={URL.createObjectURL(answer.image)}
                      alt={`Đáp án ${index + 1}`}
                      className="mt-2 max-h-14"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Writing Tab */}
      {activeTab === 3 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Thêm câu hỏi Writing</h2>
          <TextField
            label="Câu hỏi"
            fullWidth
            margin="normal"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <TextField
            label="Đáp án đúng"
            fullWidth
            margin="normal"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="mt-4">
            {writingAnswers.map((writingAnswer, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-center items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={writingAnswer.correct}
                        onChange={() => handleWritingCorrectChange(index)}
                      />
                    }
                    label=""
                  />
                  <TextField
                    label={`Đáp án ${index + 1}`}
                    value={writingAnswer.answer}
                    onChange={(e) =>
                      handleWritingAnswerChange(index, e.target.value)
                    }
                    fullWidth
                    margin="normal"
                  />
                  <div className="flex items-center ml-2">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => removeWritingAnswer(index)}
                      className="ml-2"
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
                <div className="flex justify-left items-center gap-4">
                  <span>Audio: </span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) =>
                      handleWritingAudioChange(
                        index,
                        e.target.files?.[0] || null
                      )
                    }
                  />
                  {/* Nghe trước âm thanh nếu đã tải lên */}

                  {writingAnswer.audio && (
                    <IconButton
                      onClick={() => {
                        const audioSrc = URL.createObjectURL(
                          writingAnswer.audio as Blob
                        );
                        const audio = new Audio(audioSrc);
                        audio.play();
                      }}
                      aria-label="play audio"
                    >
                      <VolumeUpIcon />
                    </IconButton>
                  )}
                </div>
              </div>
            ))}
            <Button variant="contained" onClick={addWritingAnswer}>
              Thêm đáp án
            </Button>
          </div>
        </div>
      )}
      <div className="mt-6 text-right">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Lưu câu hỏi
        </Button>
      </div>
    </div>
  );
};

export default AddQuestionTabs;
