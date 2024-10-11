// Pagination.js
import { Pagination } from "@mui/material";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (currentPage: number) => void;
};

const PaginationControlled = (props: PaginationProps) => {
  const { currentPage, totalPages, setCurrentPage } = props;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="pagination">
      <Pagination
        color="primary"
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
};

export default PaginationControlled;
