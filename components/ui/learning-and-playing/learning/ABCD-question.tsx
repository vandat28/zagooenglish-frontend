"use client";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useState } from "react";

type ABCDQuestionProps = {
  question: Question;
  handleCheckAnswer: (isTrue: number, index: number, audioSrc: string) => void;
  check: boolean[];
  isDisabled: boolean;
};

export default function ABCDQuestion(props: ABCDQuestionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (audioSrc: string) => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const audio = new Audio(audioSrc);
      audio.play();
      audio.addEventListener("ended", handleAudioEnded);
    }
  };

  const handleAudioEnded = () => {
    console.log("Audio đã kết thúc");
    setIsPlaying(false);
  };
  return (
    <>
      <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-800">
        Bạn nghe được gì? Click vào để nghe
      </h2>
      <div className=" font-medium my-8 text-center min-h-14">
        <div className="h-14 relative flex items-center justify-center">
          {" "}
          {isPlaying ? (
            <div className="now playing" id="music">
              <span className="bar n1">A</span>
              <span className="bar n2">B</span>
              <span className="bar n3">c</span>
              <span className="bar n4">D</span>
              <span className="bar n5">E</span>
              <span className="bar n6">F</span>
              <span className="bar n7">G</span>
              <span className="bar n8">H</span>
            </div>
          ) : (
            <button
              className="p-2 bg-white rounded-full hover:bg-gray-200"
              onClick={() => handleClick(props.question.title)}
            >
              <VolumeUpIcon sx={{ fontSize: 40 }} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 gap-6">
        {props.question.answers.map((item: Answer, index: number) => (
          <button
            key={index}
            onClick={() =>
              props.handleCheckAnswer(item.isTrue, index, item.audioSrc)
            }
            disabled={props.isDisabled}
            className={`bg-white group h-20 px-2 flex items-center
               border-2  hover:bg-gray-100 cursor-pointer
                rounded-full shadow-xl hover:shadow-2xl duration-100 w-full ease-out p-0
                ${
                  props.check[index] === undefined
                    ? "border-gray "
                    : props.check[index] === true
                    ? "border-green-300 "
                    : "border-red "
                }`}
          >
            <div
              className={`w-14 h-14 flex items-center justify-center
               rounded-full text-2xl 
                duration-100 ease-out  ${
                  props.check[index] === undefined
                    ? "bg-gray "
                    : props.check[index] === true
                    ? "bg-green-300 "
                    : "bg-red "
                }`}
            >
              {index === 0 ? "A" : index === 1 ? "B" : index === 2 ? "C" : "D"}
            </div>
            <div className="text-xl leading-6  font-medium grow">
              {item.answer}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
