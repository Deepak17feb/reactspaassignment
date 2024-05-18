import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../store/articlesSlice";
import { RootState, AppDispatch } from "../store/store";
import Filters from "../components/Filters";
import ArticleList from "../components/ArticleList";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import NoResults from "../components/NoResults";

const categories = ["Benzinga", "Lambda", "Delta", "Gamma"];
const authors = ["Benzinga Neuro", "Werder Helmner", "Patrick Wilson"];

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading } = useSelector(
    (state: RootState) => state.articles
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedSortBy, setSelectedSortBy] = useState<string[]>([]);
  const articlesPerPage = 5;

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handleAuthorChange = (author: string) => {
    setSelectedAuthors((prevAuthors) =>
      prevAuthors.includes(author)
        ? prevAuthors.filter((a) => a !== author)
        : [...prevAuthors, author]
    );
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSortBy((prevSortBy) =>
      prevSortBy.includes(sortOption)
        ? prevSortBy.filter((s) => s !== sortOption)
        : [...prevSortBy, sortOption]
    );
  };

  const filteredArticles = articles
    .filter(
      (article) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(article.source)) &&
        (selectedAuthors.length === 0 ||
          selectedAuthors.includes(article.author))
    )
    .sort((a, b) => {
      if (selectedSortBy.includes("Date")) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (selectedSortBy.includes("Title")) {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <div className="home-page">
      <Filters
        categories={categories}
        authors={authors}
        selectedCategories={selectedCategories}
        selectedAuthors={selectedAuthors}
        selectedSortBy={selectedSortBy}
        onCategoryChange={handleCategoryChange}
        onAuthorChange={handleAuthorChange}
        onSortChange={handleSortChange}
      />
      <div className="article-list-container">
        {loading && <Loader />}
        {!loading && paginatedArticles.length === 0 && <NoResults />}
        <ArticleList articles={paginatedArticles} />
        {paginatedArticles.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredArticles.length / articlesPerPage)}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
