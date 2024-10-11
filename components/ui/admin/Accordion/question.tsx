import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

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
  questions: Question[];
};

const answerLabels = ["A", "B", "C", "D"];

export default function QuestionAccordion(props: QuestionAccordionProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { questions } = props;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
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
            <Typography sx={{ fontWeight: 600 }}>
              {item.typeId == 1 ? (
                <div className="flex gap-3">
                  <div className="flex items-center">Câu {i + 1}:</div>
                  <audio controls>
                    <source src={item.title} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <>
                  Câu {i + 1}: {item.title}
                </>
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
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm ${
                      item.isTrue
                        ? "border-green-500 bg-green-100"
                        : "border-red"
                    }`}
                  >
                    {/* <img
                      src={`/images/${item.img}.png`}
                      alt={item.answer}
                      className="w-20 h-20 mb-2"
                    /> */}
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
                    >
                      {item.answer}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* <button className="hover:text-primary">
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
            </button> */}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
