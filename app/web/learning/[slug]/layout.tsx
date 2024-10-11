import Sidebar from "@/components/ui/learning-and-playing/learning/slidebar";
import { cookies } from "next/headers";

interface LearningLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export default function LearningLayout(props: LearningLayoutProps) {
  const userCookie = cookies().get("user");
  return (
    <>
      <div className="flex">
        <Sidebar
          slug={props.params.slug}
          id={
            props.params.slug === "beginners"
              ? 1
              : props.params.slug === "intermediate"
              ? 2
              : 3
          }
          userCookie={userCookie}
        />
        {props.children}
      </div>
    </>
  );
}
