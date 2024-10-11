import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { API_DOMAIN } from "@/constants/api";

type BlogProps = {
  blog: Blog;
};

export default function BlogCard({ blog }: BlogProps) {
  return (
    <Card className="transform transition-transform duration-300 hover:-translate-y-2 mb-6  rounded-2xl md:w-[45%] lg:w-[30%]">
      <CardMedia
        sx={{ height: 180 }}
        image={`${API_DOMAIN}/uploads/${blog.img}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="font-sans line-clamp-2"
        >
          {blog.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="font-sans line-clamp-3"
        >
          {blog.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          className="text-blue-500 hover:bg-gray-200 text-sx"
        >
          Chia sẻ
        </Button>
        <Link href={`/web/blog/${blog.id}`}>
          <Button
            size="small"
            className="text-blue-500 hover:bg-gray-200 text-sx"
          >
            Xem thêm
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
