import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoFilterCircleOutline } from "react-icons/io5";

interface FiltersProps {
  categories: string[];
  authors: string[];
  selectedCategories: string[];
  selectedAuthors: string[];
  selectedSortBy: string[];
  onCategoryChange: (category: string) => void;
  onAuthorChange: (author: string) => void;
  onSortChange: (sortOption: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  authors,
  selectedCategories,
  selectedAuthors,
  selectedSortBy,
  onCategoryChange,
  onAuthorChange,
  onSortChange,
}) => {
  const [filterState, setFilterState] = useState(false);
  const handleFilterState = () => {
    setFilterState(!filterState);
  };
  return (
    <>
      <div className={`open-filter ${filterState}`} onClick={handleFilterState}>
        <IoFilterCircleOutline /> Open Filters
      </div>
      <div className={`filter-container ${filterState}`}>
        <div className="filter-group">
          <h3 className="filter-heading">Categories</h3>
          {categories.map((category) => (
            <label key={category} className="filter-label">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="filter-input"
              />
              {category}
              <span className="filter-checkmark"></span>
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h3 className="filter-heading">Authors</h3>
          {authors.map((author) => (
            <label key={author} className="filter-label">
              <input
                type="checkbox"
                checked={selectedAuthors.includes(author)}
                onChange={() => onAuthorChange(author)}
                className="filter-input"
              />
              {author}
              <span className="filter-checkmark"></span>
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h3 className="filter-heading">Sort By</h3>
          <div className="filter-item">
            <label className="filter-label">
              <input
                type="checkbox"
                value="Date"
                checked={selectedSortBy.includes("Date")}
                onChange={() => onSortChange("Date")}
                className="filter-input"
              />
              <label htmlFor="sort-date">Date</label>
              <span className="filter-checkmark"></span>
            </label>
          </div>
          <div className="filter-item">
            <label className="filter-label">
              <input
                type="checkbox"
                value="Title"
                id="sort-title"
                checked={selectedSortBy.includes("Title")}
                onChange={() => onSortChange("Title")}
                className="filter-input"
              />
              <label htmlFor="sort-date">Title</label>
              <span className="filter-checkmark"></span>
            </label>
          </div>
        </div>
        <div
          className={`filter-close-btn ${filterState}`}
          onClick={handleFilterState}
        >
          <IoMdCloseCircleOutline />
          <div className="filter-close-text">Close Filters</div>
        </div>
      </div>
    </>
  );
};

export default Filters;
