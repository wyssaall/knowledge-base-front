import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, ShieldCheck, UserPlus } from "lucide-react";
import api from "../../services/api";
import Modal from "../../components/Modal";
import AdminUserComponent from "../../components/AdminUserComponent";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "technicien",
    domain: "",
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/api/admin/users", true);
      setUsers(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    api.get("/api/categories", true)
      .then(res => setCategories(res || []))
      .catch(() => setCategories([]));
  }, []);

  const removeUser = async (id) => {
    try {
      await api.delete(`/api/admin/users/${id}`, true);
      setSuccess("User deleted");
      fetchUsers();
    } catch (err) {
      setError(err.message || "Failed to delete user");
    }
  };

  const filteredUsers = useMemo(
    () =>
      users.filter((u) =>
        `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
      ),
    [users, search]
  );

  const updateSelectedRole = async () => {
    if (!selectedUser?._id) return;
    try {
      await api.patch(
        `/api/admin/users/${selectedUser._id}/role`,
        { role: selectedUser.role, domain: selectedUser.domain?._id || selectedUser.domain },
        true
      );
      setSuccess("Role changed successfully");
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      setError(err.message || "Failed to update role");
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/users", newUser, true);
      setSuccess("User created successfully");
      setIsCreateOpen(false);
      setNewUser({ name: "", email: "", password: "", role: "technicien", domain: "" });
      fetchUsers();
    } catch (err) {
      setError(err.message || "Failed to create user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100/50 font-sans">
      <div className="border-b border-gray-200 sticky top-0 z-20 backdrop-blur-md bg-white/80">
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
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-100 transition-all"
            >
              <UserPlus className="w-4 h-4 mr-2" /> Nouvel Utilisateur
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative w-full sm:w-80 mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un utilisateur..."
            className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all bg-white"
          />
        </div>
        {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {success && <p className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{success}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence>
              {filteredUsers.map((user, index) => (
                <AdminUserComponent
                  key={user._id}
                  id={user._id}
                  username={user.email.split("@")[0]}
                  fullName={user.name}
                  category={user.domain?.name || "Sans domaine"}
                  role={user.role === "admin" ? "Administrateur" : "Technicien"}
                  index={index}
                  onEdit={() => setSelectedUser({ ...user })}
                  onDelete={removeUser}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Modal isOpen={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} title="Modifier le role">
        {selectedUser && (
          <div className="grid gap-4">
            <p className="text-sm text-gray-600">
              Update role for <span className="font-semibold">{selectedUser.name}</span>
            </p>
            <select
              value={selectedUser.role}
              onChange={(e) => setSelectedUser((prev) => ({ ...prev, role: e.target.value }))}
              className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="technicien">Technicien</option>
              <option value="admin">Administrateur</option>
            </select>
            <select
              value={selectedUser.domain?._id || selectedUser.domain || ""}
              onChange={(e) => setSelectedUser((prev) => ({ ...prev, domain: e.target.value }))}
              className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Choisir un domaine</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Annuler
              </button>
              <button
                onClick={updateSelectedRole}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Ajouter un utilisateur">
        <form onSubmit={createUser} className="grid gap-4">
          <input
            value={newUser.name}
            onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Nom complet"
            className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="Email"
            className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Mot de passe"
            className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser((prev) => ({ ...prev, role: e.target.value }))}
            className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="technicien">Technicien</option>
            <option value="admin">Administrateur</option>
          </select>
          <select
            value={newUser.domain}
            onChange={(e) => setNewUser((prev) => ({ ...prev, domain: e.target.value }))}
            className="rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Choisir un domaine (Optionnel)</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Ajouter
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UsersManagement;

