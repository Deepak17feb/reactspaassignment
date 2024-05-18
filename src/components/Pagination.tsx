import React from "react";
import "../styles/pagination.scss";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage > totalPages - 3) {
      pageNumbers.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pageNumbers.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }

  return (
    <div className="pagination">
      <button
        className="page-item action"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdArrowBackIosNew />
      </button>
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          className={`page-item ${number === currentPage ? "active" : ""} ${
            typeof number === "number" ? "" : "inactive"
          }`}
          onClick={() => typeof number === "number" && onPageChange(number)}
          disabled={typeof number !== "number"}
        >
          {number}
        </button>
      ))}
      <button
        className="page-item action"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdArrowForwardIos />
      </button>
    </div>
  );
};

export default Pagination;
