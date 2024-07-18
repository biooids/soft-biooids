import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import ArticleSkeleton from "./ArticleSkeleton";

function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const articlesPerPage = 9;
  const { searchTerm, category } = useOutletContext();

  const fetchArticles = async (page, searchTerm = "", category = "") => {
    try {
      const res = await fetch(
        `/api/article/getArticles?startIndex=${
          page * articlesPerPage
        }&limit=${articlesPerPage}&searchTerm=${encodeURIComponent(
          searchTerm
        )}&category=${encodeURIComponent(category)}`
      );
      const data = await res.json();
      if (page === 0) {
        setArticles(data.articles);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
      }
      setTotalArticles(data.totalArticle);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setPage(0);
    fetchArticles(0, searchTerm, category);
  }, [searchTerm, category]);

  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchArticles(newPage, searchTerm, category);
  };

  return (
    <div className="all-articles gap-3 flex flex-col p-3 sm:grid">
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <ArticleSkeleton key={index} />
        ))
      ) : articles.length > 0 ? (
        <>
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
          {articles.length < totalArticles && (
            <button
              className="load-more-button bg-teal-500 text-white py-2 px-4 rounded-md mt-4"
              onClick={loadMore}
            >
              Load More
            </button>
          )}
        </>
      ) : (
        <div>No articles available.</div>
      )}
    </div>
  );
}

export default AllArticles;
