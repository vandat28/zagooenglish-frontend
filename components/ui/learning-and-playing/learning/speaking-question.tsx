"use client";
import { useEffect, useRef, useState } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

type SpeakingQuestionProps = {
  question: Question;
  setOpen: (boolean: boolean) => void;
};
const SpeechToTextPage = (props: SpeakingQuestionProps) => {
  const [transcript, setTranscript] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        if (
          transcript.toLocaleLowerCase() ===
          props.question.keyword.toLocaleLowerCase()
        ) {
          setTimeout(() => {
            props.setOpen(true);
            const audio = new Audio("/audio/correct.mp3");
            audio.play();
          }, 1000);
        } else {
          const audio = new Audio("/audio/wrong.mp3");
          audio.play();
        }
      };

      recognitionRef.current.onend = () => {
        setIsActive(false);
      };
    } else {
      console.error("Trình duyệt không hỗ trợ SpeechRecognition.");
    }
  }, [props.question]);

  const startRecording = () => {
    if (recognitionRef.current && !isActive) {
      recognitionRef.current.start();
      setIsActive(true);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isActive) {
      recognitionRef.current.stop();
      setIsActive(false);
    }
  };
  return (
    <>
      <h2 className="text-center text-2xl md:text-3xl mb-8 font-semibold">
        Phát âm: <span className="text-blue-600">{props.question.title}</span>
      </h2>
      <h2 className="text-center text-2xl md:text-3xl mb-8 font-semibold">
        {transcript && (
          <>
            Your speech: <span className="text-blue-600">{transcript}</span>
          </>
        )}
      </h2>
      <div className="flex justify-center items-center">
        <button
          onClick={isActive ? stopRecording : startRecording}
          className="p-4 bg-white rounded-full w-48 h-48 hover:bg-blue-gray-50 shadow-xl"
        >
          {isActive ? (
            <div id="bars">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          ) : (
            <KeyboardVoiceIcon sx={{ fontSize: 50 }} />
          )}
        </button>
      </div>
    </>
  );
};

export default SpeechToTextPage;
