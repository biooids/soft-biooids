import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArticleSkeleton from "../ArticleSkeleton";
import MyArticleCard from "./MyArticlesCard";

function MyArticles() {
  const { currentUser } = useSelector((state) => state.user);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/article/getArticles?userId=${currentUser._id}`
        );
        const data = await res.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserArticles();
    } else {
      setArticles([]);
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="my-articles gap-3 flex flex-col p-3 sm:grid">
        {Array.from({ length: 3 }).map((_, index) => (
          <ArticleSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return <div>You have no articles yet.</div>;
  }

  return (
    <div className="my-articles gap-3 flex flex-col p-3 sm:grid">
      {articles.map((article) => (
        <MyArticleCard
          key={article._id}
          article={article}
          isMyArticle={true}
          currentUser={currentUser}
          setArticles={setArticles}
        />
      ))}
    </div>
  );
}

export default MyArticles;
