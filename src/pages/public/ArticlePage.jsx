import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import api, { API_BASE_URL } from "../../services/api";
import { getSavedArticles, isArticleSaved, removeSavedArticle, saveArticle } from "../../utils/savedArticles";
import LanguageSwitcher from "../../components/LanguageSwitcher";

function ArticlePage() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedIds, setSavedIds] = useState([]);
  const [viewSaved, setViewSaved] = useState(false);

  useEffect(() => {
    setSavedIds(getSavedArticles());
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError("");
      try {
        let queryParams = {
          page: String(page),
          limit: "9",
          ...(search ? { search } : {}),
        };
        if (viewSaved) {
          if (savedIds.length === 0) {
            setArticles([]);
            setTotalPages(1);
            setLoading(false);
            return;
          }
          queryParams.ids = savedIds.join(",");
        }
        
        const query = new URLSearchParams(queryParams);
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
  }, [page, search, viewSaved, savedIds]);

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
        
        <div className="absolute top-6 left-6 md:top-8 md:left-12 z-20">
          <LanguageSwitcher />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-widest text-green-300">
              <span className="h-px w-8 bg-green-400" /> {t('public.hero_tagline')}
            </p>
            <h1 className="mb-6 text-5xl font-bold leading-[1.1] md:text-7xl">
              {t('public.hero_title').split('.')[0]}. {t('public.hero_title').split('.')[1]}. <br />
              <span className="relative text-green-400">
                {t('public.hero_title').split('.')[2].trim()}
                <span className="absolute bottom-1 left-0 -z-10 h-3 w-full rounded bg-green-500/30" />
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-green-100/90 md:text-xl">
              {t('public.hero_desc')}
            </p>
          </div>
          <div className="w-full md:w-auto flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder={t('public.search_placeholder')}
              className="w-full md:w-[350px] h-[52px] rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={() => { setPage(1); setViewSaved(!viewSaved); }}
              className={`flex-shrink-0 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border transition-all backdrop-blur-md shadow-lg ${
                viewSaved 
                  ? "bg-green-500 text-white border-green-400 shadow-green-500/20" 
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
              title={viewSaved ? "Show All Articles" : "Show Saved Articles"}
            >
              {viewSaved ? <BookmarkCheck className="w-6 h-6" fill="currentColor" /> : <Bookmark className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-14 px-4 pb-20 md:px-10">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-12">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h3 className="text-3xl font-bold tracking-tight text-gray-800">
              {viewSaved ? t('public.saved_library') : t('public.latest_articles')}
            </h3>
            <span className="text-sm font-semibold text-gray-500">{articles.length} {t('nav.articles').toLowerCase()}</span>
          </div>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        {loading ? (
          <p className="text-gray-600">{t('common.loading')}</p>
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
                    {savedIds.includes(article._id) ? t('public.saved') : t('public.save')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewSaved && !loading && articles.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-gray-500">
            <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">{t('public.no_saved')}</p>
            <p className="mt-2 text-sm">{t('public.no_saved_desc')}</p>
          </div>
        )}

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="rounded-lg border border-gray-300 px-4 py-2 disabled:opacity-50"
          >
            {t('common.previous')}
          </button>
          <span className="text-sm text-gray-700">
            {t('common.page')} {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            className="rounded-lg border border-gray-300 px-4 py-2 disabled:opacity-50"
          >
            {t('common.next')}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;