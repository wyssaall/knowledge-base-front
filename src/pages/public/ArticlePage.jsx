import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { API_BASE_URL } from "../../services/api";
import { getSavedArticles, isArticleSaved, removeSavedArticle, saveArticle } from "../../utils/savedArticles";

function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    setSavedIds(getSavedArticles());
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError("");
      try {
        const query = new URLSearchParams({
          page: String(page),
          limit: "9",
          ...(search ? { search } : {}),
          ...(category ? { category } : {}),
        });
        const data = await api.get(`/api/public/articles?${query.toString()}`);
        setArticles(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, search, category]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.get("/api/categories");
        setCategories(data || []);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const toggleSaved = (articleId) => {
    if (isArticleSaved(articleId)) {
      setSavedIds(removeSavedArticle(articleId));
    } else {
      setSavedIds(saveArticle(articleId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f3d2e] via-[#145c3a] to-[#0f3d2e] px-6 pb-24 pt-20 text-white md:px-16">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-green-500/20 blur-[100px]" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-widest text-green-300">
              <span className="h-px w-8 bg-green-400" /> KNOWLEDGE BASE
            </p>
            <h1 className="mb-6 text-5xl font-bold leading-[1.1] md:text-7xl">
              Read. Learn. <br />
              <span className="relative text-green-400">
                Build.
                <span className="absolute bottom-1 left-0 -z-10 h-3 w-full rounded bg-green-500/30" />
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-green-100/90 md:text-xl">
              Hand-crafted guides, insights, and resources to help you master new skills and build better software.
            </p>
          </div>
          <div className="w-full md:w-[420px] space-y-3">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search articles..."
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <select
              value={category}
              onChange={(e) => {
                setPage(1);
                setCategory(e.target.value);
              }}
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="" className="text-black">All categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id} className="text-black">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-14 px-4 pb-20 md:px-10">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-12">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h3 className="text-3xl font-bold tracking-tight text-gray-800">Latest Articles</h3>
            <span className="text-sm font-semibold text-gray-500">{articles.length} article(s)</span>
          </div>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        {loading ? (
          <p className="text-gray-600">Loading articles...</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div key={article._id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl">
                <Link to={`/articles/${article._id}`}>
                {article.imageUrl && (
                  <img
                    src={`${API_BASE_URL}${article.imageUrl}`}
                    alt={article.title}
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-green-700">{article.title}</h3>
                  <p className="text-sm text-gray-600">
                    {(article.description || "").slice(0, 100)}
                    {(article.description || "").length > 100 ? "..." : ""}
                  </p>
                </div>
                </Link>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => toggleSaved(article._id)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                      savedIds.includes(article._id)
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {savedIds.includes(article._id) ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="rounded-lg border border-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            className="rounded-lg border border-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;