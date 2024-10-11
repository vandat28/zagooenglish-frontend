"use client";
import React, { useEffect, useState } from "react";
import ModalCorrect from "./modal-correct";
import DefaultQuestion from "./default-question";
import ABCDQuestion from "./ABCD-question";
import SpeechToTextPage from "./speaking-question";
import WritingQuestion from "./writing-question";

type QuestionProps = {
  question: Question;
  setIndex: (index: number) => void;
  index: number;
  length: number;
  username?: string;
  topicId: number;
  progress: number;
};

export default function Question(props: QuestionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean[]>([]);
  const [opacity, setOpacity] = useState<boolean>(false);
  const [mainAudioSrc, setMainAudioSrc] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setCheck([]);
    setOpacity(false);
    setIsDisabled(false);
  }, [props.index, props.question]);

  const handleCheckAnswer = (
    isTrue: number,
    index: number,
    audioSrc: string
  ) => {
    // Tạo một bản sao của mảng check
    const newCheck = [...check];
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play();
      setMainAudioSrc(audioSrc);
    }

    // Cập nhật phần tử thứ `i`
    if (isTrue === 1) {
      setTimeout(() => {
        setOpen(true);
        const audio = new Audio("/audio/correct.mp3");
        audio.play();
      }, 1200);
      // Trì hoãn mở setOpen(true) trong 0.6 giây
      newCheck[index] = true;
      setIsDisabled(true);
    } else {
      newCheck[index] = false;
    }
    // Đặt lại trạng thái với bản sao mới
    setCheck(newCheck);
  };
  return (
    <>
      {props.question && (
        <main
          className={`flex flex-col w-full ${
            opacity
              ? "opacity-10 scale-50 invisible"
              : "opacity-100  scale-100 visible"
          }  duration-300`}
        >
          {props.question.typeId === 2 && (
            <DefaultQuestion
              isDisabled={isDisabled}
              question={props.question}
              handleCheckAnswer={handleCheckAnswer}
              check={check}
            />
          )}
          {props.question.typeId === 1 && (
            <ABCDQuestion
              isDisabled={isDisabled}
              question={props.question}
              handleCheckAnswer={handleCheckAnswer}
              check={check}
            />
          )}
          {props.question.typeId === 3 && (
            <SpeechToTextPage question={props.question} setOpen={setOpen} />
          )}
          {props.question.typeId === 4 && (
            <WritingQuestion question={props.question} setOpen={setOpen} />
          )}
        </main>
      )}

      <ModalCorrect
        audioSrc={mainAudioSrc}
        open={open}
        setOpen={setOpen}
        setIndex={props.setIndex}
        index={props.index}
        length={props.length}
        setOpacity={setOpacity}
        topicId={props.topicId}
        username={props.username}
        progress={props.progress}
      />
    </>
  );
}
