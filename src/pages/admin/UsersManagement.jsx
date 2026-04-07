import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, X, Users, Search, ShieldCheck, UserCog } from "lucide-react";
import AdminUserComponent from "../../components/AdminUserComponent.jsx";

const initialUsers = [
  { id: 1, username: "wissal_dz", fullName: "Wissal", category: "SI", role: "Administrateur" },
  { id: 2, username: "yasmine_it", fullName: "Yasmine", category: "Frontend", role: "Technicien" },
  { id: 3, username: "sarah_net", fullName: "Sarah", category: "NETWORK", role: "Technicien" },
];

const UsersManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      fullName: formData.get("fullName"),
      username: formData.get("username"),
      category: formData.get("category"),
      role: formData.get("role"),
    };

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
    } else {
      setUsers([...users, { id: Date.now(), ...userData }]);
    }

    setShowForm(false);
    setEditingUser(null);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100/50 font-sans">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-20 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Gestion des Utilisateurs</h1>
                <p className="text-sm text-gray-500 font-medium italic">Accès réservé aux administrateurs</p>
              </div>
            </div>

            <button
              onClick={() => {
                if (showForm) {
                    setShowForm(false);
                    setEditingUser(null);
                } else {
                    setShowForm(true);
                }
              }}
              className={`inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${showForm
                ? "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-100"
                }`}
            >
              {showForm ? (
                <><X className="w-4 h-4 mr-2" /> Annuler</>
              ) : (
                <><UserPlus className="w-4 h-4 mr-2" /> Nouvel Utilisateur</>
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
                <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <UserCog className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                        {editingUser ? "Modifier l'utilisateur" : "Créer un nouveau compte"}
                    </h3>
                    <p className="text-sm text-gray-500">Configurez les accès et le rôle de l'utilisateur.</p>
                  </div>
                </div>
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Nom Complet</label>
                        <input name="fullName" required defaultValue={editingUser?.fullName} placeholder="Ex: Jean Dupont" className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Nom d'utilisateur</label>
                        <input name="username" required defaultValue={editingUser?.username} placeholder="Ex: jdupont" className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Catégorie</label>
                        <select name="category" defaultValue={editingUser?.category || "SI"} className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white">
                          <option>SI</option>
                          <option>NETWORK</option>
                          <option>Frontend</option>
                          <option>Backend</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Rôle</label>
                        <select name="role" defaultValue={editingUser?.role || "Technicien"} className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white font-bold">
                          <option value="Administrateur">🛡️ Administrateur</option>
                          <option value="Technicien">🔧 Technicien</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-50">
                      <button type="button" onClick={() => { setShowForm(false); setEditingUser(null); }} className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                        Annuler
                      </button>
                      <button type="submit" className="px-8 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">
                        {editingUser ? "Sauvegarder les modifications" : "Créer le compte"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Utilisateurs enregistrés</h2>
            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-black rounded-full">
              {filteredUsers.length}
            </div>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Rechercher un utilisateur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all bg-white"
            />
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {filteredUsers.map((user, i) => (
              <AdminUserComponent
                key={user.id}
                id={user.id}
                username={user.username}
                fullName={user.fullName}
                category={user.category}
                role={user.role}
                index={i}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-gray-900 font-extrabold text-lg">Aucun utilisateur trouvé</h3>
            <p className="text-gray-500 mt-2">Essayez d'ajuster vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;

