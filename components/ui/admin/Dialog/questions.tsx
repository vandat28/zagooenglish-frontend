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
  const { data, error, isLoading } = useSWR<GetQuestionsOfTopicResponse>(
    `${API_QUESTIONS_OF_TOPIC}/${props.topicId}`,
    fetcher
  );

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
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
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
            <Button autoFocus color="inherit" onClick={props.onClose}>
              Lưu
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex", p: 6 }}>
          <div className="w-1/2 ">Thêm câu hỏi</div>
          <div className="w-1/2 space-y-2">
            <QuestionAccordion questions={data?.questions || []} />
          </div>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
