import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { API_BASE_URL } from "../../services/api";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await api.get(`/api/public/articles/${id}`);
        setArticle(data.data);
      } catch (err) {
        setError(err.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!article) return <div className="p-6">Article not found</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/" className="mb-6 inline-block text-sm text-green-700 hover:underline">
        Back to articles
      </Link>
      <h1 className="mb-4 text-3xl font-bold text-gray-900">{article.title}</h1>
      {article.imageUrl && (
        <img
          src={`${API_BASE_URL}${article.imageUrl}`}
          alt={article.title}
          className="mb-6 h-72 w-full rounded-2xl object-cover"
        />
      )}
      <p className="mb-4 text-gray-600">{article.description}</p>
      <div className="whitespace-pre-line text-gray-800">{article.content}</div>
    </div>
  );
}

export default ArticleDetail;
