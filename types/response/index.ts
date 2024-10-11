type Level = {
    id: number;
    img: string;
    color: string;
    name: string;
    slug: string;
    topics: Topic[];
}

type Topic = {
    id: number;
    name: string;
    label: string;
    img: string;
    progress: number
}

type Question = {
    id: number;
    title: string;
    keyword: string;
    typeId: number;
    typeName: string;
    answers: Answer[];
}

type Answer = {
    id:number;
    img: string;
    answer: string;
    audioSrc: string;
    isTrue: number;
}


type GetLevelResponse = {
    result: Level []
}

type GetQuestionsOfTopicResponse = {
    topic: Topic;
    questions: Question[]
}

type Blog = {
    id: number;
    title: string;
    description: string;
    content: string;
    img: string;
}