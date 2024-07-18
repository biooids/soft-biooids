import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import ArticleCommentSection from "./ArticleCommentSection";

function ArticlePage() {
  const { articleSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/article/getArticle?slug=${articleSlug}`);
      const data = await res.json();
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setArticle(data.article);
        setLoading(false);
        setError(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [articleSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading article</div>;
  }

  const handleCategoryClick = (category) => {
    navigate("/articles", { state: { category } });
  };

  return (
    <section className="p-3 flex flex-col mx-auto min-h-screen ">
      <div
        onClick={() => handleCategoryClick(article.category)}
        className="self-center  underline cursor-pointer hover:dark:text-cyan-300"
      >
        Category: {article && article.category}
      </div>
      <img
        src={article && article.image}
        alt={article && article.title}
        className="mt-5 p-3 max-h-[300px] w-full object-cover"
      />
      <div>
        <h1 className="text-xl  p-3 text-center font-serif break-words  md:text-2xl  lg:text-3xl  bg-black text-cyan-500 rounded-lg">
          {article && article.title}
        </h1>
      </div>
      {article && article.externalLink && (
        <a
          href={article.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit self-center text-purple-950 font-bold p-2 rounded-md mt-3 bg-cyan-300 hover:bg-cyan-500 transition-all duration-300"
        >
          Visit the site &#8594;
        </a>
      )}
      <div className="flex justify-between p-3 border-b border-cyan-600 mx-auto w-full max-w-3xl text-sm">
        <span>
          {article && new Date(article.createdAt).toLocaleDateString()}
        </span>
        <span>
          {article && (article.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full rounded-lg post-content text-black"
        dangerouslySetInnerHTML={{ __html: article && article.content }}
      ></div>
      {article && <ArticleCommentSection articleId={article._id} />}
    </section>
  );
}

export default ArticlePage;
