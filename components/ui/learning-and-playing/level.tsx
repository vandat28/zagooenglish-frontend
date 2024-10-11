import Topic from "@/components/ui/learning-and-playing/topic";

type LevelProps = {
  color: string;
  name: string;
  img: string;
  slug: string;
  topics: Topic[];
};

export default function Level(props: LevelProps) {
  return (
    <>
      <div
        className={`flex flex-col border p-6 border-black border-2 rounded-xl bg-white mb-8 font-medium shadow-xl`}
      >
        <div className="flex justify-start items-center space-x-2">
          <h2 className="text-xl font-bold md:text-2xl text-gray-500">
            {props.name}
          </h2>
          <img src={props.img} alt="" className="w-8 md:w-16" />
        </div>
        <div className="mt-8 flex flex-col justify-center items-center md:px-10 md:flex-row md:gap-[10%] lg:gap-[5%] md:flex-wrap">
          {props.topics.map((topic: Topic, index: number) => (
            <Topic
              key={index}
              color={props.color}
              slug={props.slug}
              topic={topic}
            />
          ))}
        </div>
      </div>
    </>
  );
}
