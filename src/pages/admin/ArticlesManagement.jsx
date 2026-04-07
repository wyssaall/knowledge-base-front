import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, FileText, PlusCircle, CheckCircle, Clock, Filter } from "lucide-react";
import AdminArticleComponent from "../../components/AdminArticleComponent.jsx";

const initialArticles = [
  { id: 1, title: "Build scalable apps with clean architecture", category: "SI", date: "April 4, 2026", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", status: "Validated" },
  { id: 2, title: "Mastering React performance optimization", category: "Frontend", date: "April 5, 2026", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", status: "Pending" },
  { id: 3, title: "Setting up a robust Network infrastructure", category: "NETWORK", date: "April 6, 2026", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", status: "Validated" },
  { id: 4, title: "How to deploy Docker containers on AWS", category: "Backend", date: "April 7, 2026", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", status: "Pending" },
  { id: 5, title: "Zero Trust Architecture Explained", category: "SI", date: "April 8, 2026", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", status: "Validated" },
];

const ArticlesManagement = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleValidate = (id) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, status: "Validated" } : article
    ));
  };

  const handleDelete = (id) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newArticle = {
      id: Date.now(),
      title: formData.get("title"),
      category: formData.get("category"),
      content: formData.get("content"),
      image: formData.get("image") || "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      date: new Date().toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }),
      status: "Validated" // Admin added articles are automatically validated
    };
    setArticles([newArticle, ...articles]);
    setShowForm(false);
  };

  const filteredArticles = articles.filter(
    (a) =>
      (statusFilter === "All" || a.status === statusFilter) &&
      (a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       a.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100/50 font-sans">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-20 backdrop-blur-md bg-white/80">
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
              onClick={() => setShowForm(!showForm)}
              className={`inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${showForm
                ? "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-100"
                }`}
            >
              {showForm ? (
                <><X className="w-4 h-4 mr-2" /> Annuler</>
              ) : (
                <><PlusCircle className="w-4 h-4 mr-2" /> Nouvel Article</>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Form Section */}
        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-10"
            >
              <div className="bg-white border border-gray-200 rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <PlusCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Créer un nouvel article</h3>
                        <p className="text-sm text-gray-500">Remplissez les détails pour publier l'article.</p>
                    </div>
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black border border-emerald-100 flex items-center gap-1 uppercase tracking-wider">
                    <CheckCircle size={12} /> Auto-Validé
                  </div>
                </div>
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Titre de l'article</label>
                      <input name="title" required placeholder="Ex: Déployer des conteneurs Docker sur AWS" className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Catégorie</label>
                        <select name="category" className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white appearance-none">
                          <option>SI</option>
                          <option>NETWORK</option>
                          <option>Frontend</option>
                          <option>Backend</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">URL de l'image de couverture</label>
                        <input name="image" type="url" placeholder="https://images.unsplash.com/..." className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Contenu</label>
                      <textarea name="content" required rows="6" placeholder="Rédigez le contenu de votre article ici..." className="w-full rounded-2xl border border-gray-200 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"></textarea>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-50">
                      <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                        Annuler
                      </button>
                      <button type="submit" className="px-8 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">
                        Publier l'Article
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters and Search Section */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex bg-white p-1 rounded-2xl border border-gray-200 w-full sm:w-auto shadow-sm">
              {["All", "Validated", "Pending"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                    statusFilter === status
                      ? "bg-gray-100 text-gray-900 shadow-inner"
                      : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                  }`}
                >
                  {status === "Validated" && <CheckCircle size={14} className="text-emerald-500" />}
                  {status === "Pending" && <Clock size={14} className="text-amber-500" />}
                  {status === "All" ? "Tous" : status === "Validated" ? "Validés" : "En attente"}
                </button>
              ))}
            </div>
            <div className="text-xs font-bold text-gray-400 hidden sm:block tracking-wide uppercase">
              {filteredArticles.length} Article(s)
            </div>
          </div>

          <div className="relative flex-1 max-w-md lg:ml-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Rechercher par titre ou catégorie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all shadow-gray-100/50"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {filteredArticles.map((article, i) => (
              <AdminArticleComponent
                key={article.id}
                id={article.id}
                title={article.title}
                category={article.category}
                date={article.date}
                image={article.image}
                status={article.status}
                index={i}
                onValidate={handleValidate}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-gray-900 font-extrabold text-lg">Aucun article trouvé</h3>
            <p className="text-gray-500 mt-2">Essayez d'ajuster vos filtres ou votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default ArticlesManagement;