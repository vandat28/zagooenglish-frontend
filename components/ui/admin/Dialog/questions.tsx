import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/material";
import QuestionAccordion from "@/components/ui/admin/Accordion/question";
import { fetcher } from "@/api/fetcher";
import useSWR from "swr";
import { API_QUESTIONS_OF_TOPIC } from "@/constants/api";
import AddQuestions from "@/components/ui/admin/Dialog/addQuestions";
import ToastNotification from "@/components/ui/toast-notification";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type QuestionsManagementDialogProps = {
  open: boolean;
  onClose: () => void;
  topicId?: number;
};

export default function QuestionsManagementDialog(
  props: QuestionsManagementDialogProps
) {
  const { data, error, isLoading, mutate } =
    useSWR<GetQuestionsOfTopicResponse>(
      `${API_QUESTIONS_OF_TOPIC}/${props.topicId}`,
      fetcher
    );

  const resetData = () => {
    mutate();
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.onClose}
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
              Quản lý chủ đề: {data?.topic?.name}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex", p: 6, gap: "4%" }}>
          {data?.topic?.active !== 1 && (
            <div className="w-[48%] ">
              <AddQuestions topicId={data?.topic?.id} resetData={resetData} />
            </div>
          )}

          <div className="w-[48%] space-y-2">
            <QuestionAccordion
              topicActive={data?.topic?.active}
              topicId={data?.topic?.id}
              questions={data?.questions || []}
              resetData={resetData}
            />
          </div>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
