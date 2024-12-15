import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { IconButton, Tooltip } from "@mui/material";
import { API_TOPIC, UPLOAD_DOMAIN } from "@/constants/api";
import axios from "axios";
import { notifyError, notifySuccess } from "@/components/ui/toast-notification";
import ToastNotification from "@/components/ui/toast-notification";
import UpdateQuestionDialog from "@/components/ui/admin/Dialog/updateQuestions";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .04)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

type QuestionAccordionProps = {
  topicActive: number | undefined;
  questions: Question[];
  resetData: () => void;
  topicId: number | undefined;
};

const answerLabels = ["A", "B", "C", "D"];

export default function QuestionAccordion(props: QuestionAccordionProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { questions } = props;
  const [open, setOpen] = React.useState(false); // State để điều khiển việc mở Dialog
  const [item, setItem] = React.useState<any>();
  // Hàm mở Dialog
  const handleOpen = (item: any) => {
    setOpen(true);
    setItem(item);
  };

  // Hàm đóng Dialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleDelete = async (questionId: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa câu hỏi này?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_TOPIC}/delete-question/${questionId}`);

      props.resetData();
    } catch (error) {
      console.error("Lỗi khi xóa câu hỏi:", error);
    }
  };

  return (
    <>
      {" "}
      <div>
        {questions.map((item, i) => (
          <Accordion
            key={i}
            expanded={expanded === `panel${i + 1}`}
            onChange={handleChange(`panel${i + 1}`)}
          >
            <AccordionSummary
              aria-controls={`panel${i + 1}d-content`}
              id={`panel${i + 1}d-header`}
            >
              <div className="flex gap-3">
                <Typography sx={{ fontWeight: 600 }}>
                  {item.typeId == 1 ? (
                    <div className="flex ">
                      <div className="flex items-center">Câu {i + 1}:</div>
                      <audio controls>
                        <source
                          src={`${UPLOAD_DOMAIN}/${item.title}`}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : (
                    <div className="flex gap-3 items-center justify-center h-full">
                      <div>
                        Câu {i + 1}: {item.title}
                      </div>
                    </div>
                  )}
                </Typography>
                <div
                  className={`absolute right-2 top-2 font-semibold flex items-center px-2 py-1 rounded-full shadow-md ${
                    item.typeId === 1
                      ? "bg-red"
                      : item.typeId === 2
                      ? "bg-green-500"
                      : item.typeId === 3
                      ? "bg-blue-500"
                      : "bg-yellow-500" // Màu mặc định cho type4 hoặc các loại khác
                  }`}
                >
                  <Typography>{item.typeName}</Typography>
                </div>
                <div className="flex items-center">
                  {" "}
                  <IconButton
                    className="hover:text-primary ml-3"
                    onClick={() => handleOpen(item)}
                  >
                    <Tooltip title="Chỉnh sửa" placement="top">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5 "
                      >
                        <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                      </svg>
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className="hover:text-rose-500"
                    onClick={() => handleDelete(item.id)}
                    disabled={props.topicActive == 1}
                  >
                    <Tooltip
                      title="Xóa"
                      placement="top"
                      disableHoverListener={props.topicActive == 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Tooltip>
                  </IconButton>
                </div>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              {item.typeId == 1 && (
                <div className="flex gap-6">
                  {item.answers.map((answer, i) => (
                    <div key={answer.id} className="flex items-center gap-2">
                      <span className="font-bold">{answerLabels[i]}.</span>
                      <button
                        className={`px-4 py-2 border rounded-lg cursor-pointer ${
                          answer.isTrue
                            ? "border-green-500 bg-green-100"
                            : "border-red"
                        }`}
                      >
                        {answer.answer}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {item.typeId == 2 && (
                <div className="grid grid-cols-2 gap-4 p-4">
                  {item.answers.map((item) => (
                    <div
                      key={item.id}
                      title="Bấm để nghe âm thanh"
                      className={`flex flex-col cursor-pointer items-center justify-center p-4 border rounded-lg shadow-sm ${
                        item.isTrue
                          ? "border-green-500 bg-green-100"
                          : "border-red"
                      }`}
                      onClick={() => {
                        if (item.audioSrc) {
                          const audio = new Audio(
                            `${UPLOAD_DOMAIN}/${item.audioSrc}`
                          );
                          audio.play();
                        }
                      }}
                    >
                      <img
                        src={`${UPLOAD_DOMAIN}/${item.img}`}
                        alt={item.answer}
                        className="w-20 h-20 mb-2"
                      />
                      <p className="text-lg font-semibold">{item.answer}</p>
                    </div>
                  ))}
                </div>
              )}
              {item.typeId == 3 && (
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">
                    Đáp án: {item.keyword}
                  </h2>
                </div>
              )}
              {item.typeId == 4 && (
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">
                    Đáp án: {item.keyword}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {item.answers.map((item) => (
                      <button
                        key={item.id}
                        className={`px-4 py-2 border rounded-lg cursor-pointer ${
                          item.isTrue
                            ? "border-green-500 bg-green-100"
                            : "border-red"
                        }`}
                        title="Bấm để nghe âm thanh"
                        onClick={() => {
                          if (item.audioSrc) {
                            const audio = new Audio(
                              `${UPLOAD_DOMAIN}/${item.audioSrc}`
                            );
                            audio.play();
                          }
                        }}
                      >
                        {item.answer}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <UpdateQuestionDialog
        open={open}
        handleClose={handleClose}
        resetData={props.resetData}
        initialData={item}
      />
    </>
  );
}
