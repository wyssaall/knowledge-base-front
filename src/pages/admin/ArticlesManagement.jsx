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
  const [editingArticle, setEditingArticle] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    imageUrl: "",
  });

  const fetchArticles = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get("/api/articles", true);
      setArticles(data.data || []);
    } catch (err) {
      setError(err.message || "Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

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
      fetchArticles();
    } catch (err) {
      setError(err.message || "Validation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/articles/${id}`, true);
      setSuccess("Article deleted successfully");
      fetchArticles();
    } catch (err) {
      setError(err.message || "Delete failed");
    }
  };

  const openCreateModal = () => {
    setEditingArticle(null);
    setForm({ title: "", description: "", content: "", category: "", imageUrl: "" });
    setIsCreateOpen(true);
  };

  const openEditModal = (article) => {
    setEditingArticle(article);
    setForm({
      title: article.title || "",
      description: article.description || "",
      content: article.content || "",
      category: article.category?._id || article.category || "",
      imageUrl: article.imageUrl || "",
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

  const submitArticle = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const payload = {
      title: form.title,
      description: form.description,
      content: form.content,
      category: form.category || undefined,
      imageUrl: form.imageUrl || undefined,
    };
    try {
      if (editingArticle?._id) {
        await api.put(`/api/articles/${editingArticle._id}`, payload, true);
        setSuccess("Article updated successfully");
      } else {
        await api.post("/api/articles", payload, true);
        setSuccess("Article created successfully");
      }
      closeModal();
      fetchArticles();
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
                  category={article.category?.name || "SI"}
                  date={new Date(article.createdAt).toLocaleDateString()}
                  image={article.imageUrl ? `${API_BASE_URL}${article.imageUrl}` : undefined}
                  status={article.status === "validated" ? "Validated" : "Pending"}
                  index={index}
                  onValidate={handleValidate}
                  onDelete={handleDelete}
                  onEdit={() => openEditModal(article)}
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
          <select
            name="category"
            value={form.category}
            onChange={handleFormChange}
            className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Choisir une categorie</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleFormChange}
            placeholder="URL image (optionnel)"
            className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
