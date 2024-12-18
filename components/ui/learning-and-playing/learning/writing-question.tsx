"use client";
import { UPLOAD_DOMAIN } from "@/constants/api";
import React, { useEffect, useState } from "react";

type WritingQuestionProps = {
  question: Question;
  setOpen: (boolean: boolean) => void;
};
const WritingQuestion = (props: WritingQuestionProps) => {
  const [text, setText] = useState<string[]>([]);
  const [isClicked, setIsClicked] = useState<number[]>([]);
  const [trueAnswerIndex, setTrueAnswerIndex] = useState<number>(0);
  const [isFalse, setIsFalse] = useState<boolean[]>([]);
  const trueAnswer = props.question.keyword.split(" ");

  useEffect(() => {
    setText([]);
    setIsFalse([]);
    setIsClicked([]);
    setTrueAnswerIndex(0);
  }, [props.question]);

  useEffect(() => {
    if (text.length === trueAnswer.length) {
      setTimeout(() => {
        props.setOpen(true);
        const audio = new Audio("/audio/correct.mp3");
        audio.play();
      }, 1200);
    }
  }, [text]);

  const handleClick = (
    answer: string,
    isTrue: number,
    index: number,
    audioSrc: string
  ) => {
    if (isTrue === 1 && answer === trueAnswer[trueAnswerIndex]) {
      const audio = new Audio(`${UPLOAD_DOMAIN}/${audioSrc}`);
      audio.play();
      setText([...text, answer]);
      setIsClicked([...isClicked, index]);
      if (trueAnswerIndex < trueAnswer.length) {
        setTrueAnswerIndex(trueAnswerIndex + 1);
      }
    } else {
      const audio = new Audio("/audio/wrong.mp3");
      audio.play();
      const newCheck = [...isFalse];
      newCheck[index] = true;
      setIsFalse(newCheck);
      setTimeout(() => {
        const newCheck = [...isFalse];
        newCheck[index] = false;
        setIsFalse(newCheck);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-center text-2xl md:text-3xl mb-8 font-semibold">
        Dịch câu sau
      </h2>
      <p className="text-center text-2xl md:text-3xl mb-8 font-semibold text-blue-600">
        {props.question.title}
      </p>
      <div
        className={`bg-white p-4 rounded-lg shadow-lg mb-8 w-full h-48 space-x-2 border-4
         ${text.length === trueAnswer.length && "border-green-400"}`}
      >
        {text.map((item: string, index: number) => (
          <button
            key={index}
            className="bg-white border-2 border-slate-200 px-4 py-3 rounded-md shadow-lg font-semibold text-lg wordAnimation"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex space-x-4">
        {props.question.answers.map((item: Answer, index: number) => (
          <div key={index}>
            {isClicked.includes(index) ? (
              <button
                key={index}
                disabled={true}
                className="bg-slate-100 px-4 py-3 rounded-md shadow-lg text-lg"
              >
                <span className="invisible">{item.answer}</span>
              </button>
            ) : (
              <button
                key={index}
                onClick={() =>
                  handleClick(item.answer, item.isTrue, index, item.audioSrc)
                }
                className={`bg-white border-2 border-black px-4 py-3 rounded-md shadow-lg text-lg hover:bg-gray-300 hover:shadow-xl
                ${isFalse[index] ? "shake border-red" : ""}`}
              >
                <span className="visible font-semibold">{item.answer}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WritingQuestion;
