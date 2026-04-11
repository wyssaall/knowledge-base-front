import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle, Search, FileText } from "lucide-react";
import api from "../../services/api";
import Modal from "../../components/Modal";
import AdminArticleComponent from "../../components/AdminArticleComponent";
import { API_BASE_URL } from "../../services/api";

const ArticlesManagement = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    categories: [],
    image: null,
  });

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await api.get('/api/auth/me', true);
        setCurrentUser(res.user);
        const endpoint = res.user.role === "technicien" ? "/api/articles/me/all" : "/api/articles";
        const data = await api.get(endpoint, true);
        setArticles(data.data || []);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const fetchArticles = async (quiet = false) => {
    if (!quiet) setLoading(true);
    if (!quiet) setError("");
    try {
      const endpoint = currentUser?.role === "technicien" ? "/api/articles/me/all" : "/api/articles";
      const data = await api.get(endpoint, true);
      setArticles(data.data || []);
    } catch (err) {
      if (!quiet) setError(err.message || "Failed to load articles");
    } finally {
      if (!quiet) setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.get("/api/categories", true);
        setCategories(data || []);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const filteredArticles = useMemo(
    () =>
      articles.filter((a) =>
        `${a.title} ${a.description || ""}`.toLowerCase().includes(search.toLowerCase())
      ),
    [articles, search]
  );

  const handleValidate = async (id) => {
    try {
      await api.patch(`/api/articles/${id}/validate`, { status: "validated" }, true);
      setSuccess("Article validated successfully");
      fetchArticles(true);
    } catch (err) {
      setError(err.message || "Validation failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.patch(`/api/articles/${id}/validate`, { status: "rejected" }, true);
      setSuccess("Article rejected successfully");
      fetchArticles(true);
    } catch (err) {
      setError(err.message || "Rejection failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/articles/${id}`, true);
      setSuccess("Article deleted successfully");
      fetchArticles(true);
    } catch (err) {
      setError(err.message || "Delete failed");
    }
  };

  const openCreateModal = () => {
    setEditingArticle(null);
    setForm({ 
      title: "", 
      description: "", 
      content: "", 
      categories: [], 
      image: null 
    });
    setIsCreateOpen(true);
  };

  const openEditModal = (article) => {
    setEditingArticle(article);
    setForm({
      title: article.title || "",
      description: article.description || "",
      content: article.content || "",
      categories: article.categories?.map(c => c._id || c) || [],
      image: null,
    });
  };

  const closeModal = () => {
    setIsCreateOpen(false);
    setEditingArticle(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const submitArticle = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("content", form.content);
    if (form.categories && form.categories.length > 0) {
      formData.append("categories", JSON.stringify(form.categories));
    }
    if (form.image) formData.append("image", form.image);

    try {
      if (editingArticle?._id) {
        await api.put(`/api/articles/${editingArticle._id}`, formData, true, true);
        setSuccess("Article updated successfully");
      } else {
        await api.post("/api/articles", formData, true, true);
        setSuccess("Article created successfully");
      }
      closeModal();
      fetchArticles(true);
    } catch (err) {
      setError(err.message || "Article save failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100/50 font-sans">
      <div className="border-b border-gray-200 bg-white/80 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Gestion des Articles</h1>
                <p className="text-sm text-gray-500 font-medium italic">Ajouter, valider et organiser votre base</p>
              </div>
            </div>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-100 transition-all"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Nouvel Article
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>
        {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {success && <p className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{success}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence>
              {filteredArticles.map((article, index) => (
                <AdminArticleComponent
                  key={article._id}
                  id={article._id}
                  title={article.title}
                  description={article.description}
                  category={article.categories && article.categories.length > 0 ? article.categories[0].name : "SI"}
                  date={new Date(article.createdAt).toLocaleDateString()}
                  image={article.imageUrl ? `${API_BASE_URL}${article.imageUrl}` : undefined}
                  status={article.status === "validated" ? "Validated" : "Pending"}
                  index={index}
                  onValidate={handleValidate}
                  onReject={handleReject}
                  onDelete={handleDelete}
                  onEdit={() => openEditModal(article)}
                  canManage={currentUser?.role === "admin" || currentUser?._id === article.author?._id}
                  isAdmin={currentUser?.role === "admin"}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Modal
        isOpen={isCreateOpen || Boolean(editingArticle)}
        onClose={closeModal}
        title={editingArticle ? "Modifier un article" : "Ajouter un article"}
      >
        <form onSubmit={submitArticle} className="grid gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleFormChange}
            placeholder="Titre"
            className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleFormChange}
            placeholder="Description courte"
            className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            rows={2}
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleFormChange}
            placeholder="Contenu"
            className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            rows={6}
            required
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Catégories (Sélectionnez une ou plusieurs)</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = form.categories.includes(cat._id);
                return (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => {
                      setForm(prev => {
                        if (isSelected) {
                          return { ...prev, categories: prev.categories.filter(id => id !== cat._id) };
                        } else {
                          return { ...prev, categories: [...prev.categories, cat._id] };
                        }
                      });
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isSelected 
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-200" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              {editingArticle ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ArticlesManagement;
