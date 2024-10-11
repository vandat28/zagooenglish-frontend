type DefaultQuestionProps = {
  question: Question;
  handleCheckAnswer: (isTrue: number, index: number, audioSrc: string) => void;
  check: boolean[];
  isDisabled: boolean;
};

export default function DefaultQuestion(props: DefaultQuestionProps) {
  return (
    <>
      <h2 className="text-center text-2xl 2xl:text-3xl mb-8 font-semibold">
        Chọn <span className="text-blue-600">{props.question.title}</span>
      </h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 2xl:gap-6">
        {props.question.answers.map((item: Answer, index: number) => (
          <button
            key={index}
            onClick={() =>
              props.handleCheckAnswer(item.isTrue, index, item.audioSrc)
            }
            disabled={props.isDisabled}
            className={`flex flex-col items-center
            justify-center  max-h-64 cursor-pointer hover:shadow-2xl rounded-lg `}
          >
            <div
              className={`w-full rounded-t-xl border-2 shadow-xl flex justify-center ${
                props.check[index] === undefined
                  ? "border-gray bg-white"
                  : props.check[index] === true
                  ? "border-green-300 bg-white"
                  : "border-red bg-white"
              }`}
            >
              <img
                className="w-28 md:w-36"
                src={`https://dinoenglish.app/_next/image?url=%2Fassets%2Fmedia%2Fgreeting%2Fimage%2F${item.img}.png&w=1920&q=75`}
              />
            </div>

            <div
              className={`text-gray-900 text-lg font-medium w-full border-2 border-t-0 rounded-b-xl
               text-center p-2 2xl:text-2xl shadow-xl ${
                 props.check[index] === undefined
                   ? "border-gray bg-white"
                   : props.check[index] === true
                   ? "border-green-400 bg-green-400"
                   : "border-red bg-red"
               }`}
            >
              {item.answer}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
