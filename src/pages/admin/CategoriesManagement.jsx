import React, { useEffect, useState } from "react";
import { Tag, PlusCircle, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "../../services/api";
import Modal from "../../components/Modal";

function CategoriesManagement() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get("/api/categories", true);
      setCategories(data || []);
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await api.post("/api/categories", { name: name.trim() }, true);
      setName("");
      setSuccess("Categorie ajoutee");
      setIsCreateOpen(false);
      fetchCategories();
    } catch (err) {
      setError(err.message || "Failed to create category");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/api/categories/${id}`, true);
      setSuccess("Categorie supprimee");
      fetchCategories();
    } catch (err) {
      setError(err.message || "Failed to delete category");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100/50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-600 p-3 text-white">
              <Tag size={20} />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Gestion des Categories</h1>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <PlusCircle size={16} /> Ajouter une categorie
          </button>
        </div>

        {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {success && <p className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{success}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {categories.map((cat, i) => (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">{cat.name}</h3>
                    <button
                      onClick={() => deleteCategory(cat._id)}
                      className="rounded-lg p-2 text-rose-500 transition hover:bg-rose-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Ajouter une categorie">
        <form onSubmit={createCategory} className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de categorie"
            className="h-11 flex-1 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            <PlusCircle size={16} /> Ajouter
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default CategoriesManagement;
