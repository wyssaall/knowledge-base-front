import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api, { API_BASE_URL } from "../../services/api";
import LanguageSwitcher from "../../components/LanguageSwitcher";

function ArticleDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [pseudoName, setPseudoName] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/api/public/articles/${id}/comments`);
      setComments(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await api.get(`/api/public/articles/${id}`);
        setArticle(data.data);
      } catch (err) {
        setError(err.message || t('common.error'));
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmittingComment(true);
    try {
      await api.post(`/api/public/articles/${id}/comments`, { 
        commentContent: newComment,
        pseudoName: pseudoName.trim() || undefined
      });
      setNewComment("");
      setPseudoName("");
      fetchComments();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-gray-50 text-emerald-700 font-bold">{t('common.loading')}</div>;
  if (error) return <div className="flex min-h-screen items-center justify-center bg-gray-50 text-red-600 font-bold">{error}</div>;
  if (!article) return <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600 font-bold">Article not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f3d2e] via-[#145c3a] to-[#0f3d2e] px-6 pt-20 pb-32 text-white md:px-16">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-green-500/20 blur-[100px]" />
        
        <div className="absolute top-6 left-6 md:top-8 md:left-12 z-20">
          <LanguageSwitcher />
        </div>

        <Link to="/" className="relative z-10 mb-8 inline-flex items-center gap-2 text-sm font-semibold text-green-300 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {t('nav.back_to_all')}
        </Link>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl tracking-tight">
            {article.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-green-100/90 md:text-xl">
            {article.description}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div className="relative z-20 mx-auto max-w-4xl px-4 -mt-20">
        <div className="rounded-3xl border border-white bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-12 mb-10">
          {article.imageUrl && (
            <div className="mb-10 overflow-hidden rounded-2xl shadow-md">
              <img
                src={`${API_BASE_URL}${article.imageUrl}`}
                alt={article.title}
                className="w-full object-cover max-h-[500px]"
              />
            </div>
          )}
          <div className="prose prose-lg prose-green max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>

        {/* Comments Section */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:p-12">
          <h3 className="mb-8 text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-100 pb-4">
            {t('public.comments_title')} ({comments.length})
          </h3>

          <form onSubmit={handleCommentSubmit} className="mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">{t('public.leave_comment')}</h4>
            <input
              type="text"
              className="mb-4 w-full rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all font-medium"
              placeholder="Your Name (Optional)"
              value={pseudoName}
              onChange={(e) => setPseudoName(e.target.value)}
              disabled={submittingComment}
            />
            <textarea
              className="mb-4 w-full rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all resize-none font-medium"
              rows="4"
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={submittingComment}
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submittingComment || !newComment.trim()}
                className="rounded-xl bg-gradient-to-r from-green-600 to-green-500 px-8 py-3 font-bold tracking-wide text-white shadow-md transition-all hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:hover:scale-100"
              >
                {submittingComment ? t('public.posting') : t('public.post_comment')}
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-500 bg-gray-50/50 font-medium">
                {t('public.no_comments')}
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-green-100">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-50 text-emerald-700 font-bold shadow-sm border border-emerald-100/50 text-lg">
                        {(comment.author ? comment.author.name[0] : (comment.pseudoName ? comment.pseudoName[0] : "A")).toUpperCase()}
                      </div>
                      <div>
                        <span className="block font-bold text-gray-900 text-lg">
                          {comment.author ? comment.author.name : comment.pseudoName || t('public.anonymous')}
                        </span>
                        <span className="text-sm font-medium text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap pl-16 text-gray-700 leading-relaxed text-base">{comment.commentContent}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
