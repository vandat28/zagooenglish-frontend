"use client";
import { fetcher } from "@/api/fetcher";
import Level from "@/components/ui/learning-and-playing/level";
import CircleLoading from "@/components/ui/loading/circle-loading";
import { API_LEVEL } from "@/constants/api";
import { useUser } from "@/context/user";
import useSWR from "swr";

export default function LearningAndPlaying() {
  const { user } = useUser();
  const { data, error } = useSWR<GetLevelResponse>(
    `${API_LEVEL}?username=${user?.username}`,
    fetcher
  );

  // Determine loading state

  console.log(data);

  const isLoading = !data && !error;

  if (error) return <div>Error</div>;
  if (isLoading) return <CircleLoading />;

  return (
    <>
      {data &&
        data.result.map((level: Level, index: number) => (
          <Level
            key={index}
            color={level.color}
            img={level.img}
            name={level.name}
            slug={level.slug}
            topics={level.topics}
          />
        ))}
    </>
  );
}
