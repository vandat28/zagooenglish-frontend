import React from "react";

interface Review {
  author: string;
  rating: number;
  date: string;
  content: string;
}

const ReviewCard: React.FC<Review> = ({ author, rating, date, content }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6 md:w-[30%] transform transition-transform duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-between md:flex-col md:items-start">
        <div className="flex md:flex-col">
          <div className="text-lg font-bold">{author}</div>
          <div className="text-yellow-500">{rating}</div>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500">{date}</span>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      author: "Xuân Nguyễn",
      rating: 5,
      date: "4 tháng 12, 2022",
      content: "học rất vui và hiệu quả nha nên tải app này",
    },
    {
      author: "nnguyen mi ni tung",
      rating: 4,
      date: "2 tháng 12, 2022",
      content: "- Vừa học vừa chơi nên 5 nhé",
    },
    {
      author: "Liên Mai",
      rating: 5,
      date: "10 tháng 12, 2022",
      content: "Dịch tiếng Anh tốt. Bài học hiệu quả, có tính năng cao",
    },
    {
      author: "nnguyen mi ni tung",
      rating: 4,
      date: "2 tháng 12, 2022",
      content: "- Vừa học vừa chơi nên 5 nhé",
    },
    {
      author: "Liên Mai",
      rating: 5,
      date: "10 tháng 12, 2022",
      content: "Dịch tiếng Anh tốt. Bài học hiệu quả, có tính năng cao",
    },
  ];

  return (
    <div className="mt-8 flex flex-col items-center justify-center font-medium">
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 my-8">
        <span className="text-blue-500">Đánh giá </span>của người dùng
      </h1>
      <div className="flex flex-col md:flex-row md:gap-[5%] md:flex-wrap">
        {reviews.map((review) => (
          <ReviewCard key={review.author} {...review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
