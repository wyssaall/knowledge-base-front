import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, X, Users, Search } from "lucide-react";
import AdminUserComponent from "../../components/AdminUserComponent.jsx";

const users = [
  { id: 1, username: "jdoe", fullName: "John Doe", category: "SI", role: "Admin" },
  { id: 2, username: "asmith", fullName: "Alice Smith", category: "NETWORK", role: "User" },
  { id: 3, username: "mjones", fullName: "Mike Jones", category: "Frontend", role: "Editor" },
  { id: 4, username: "rlewis", fullName: "Rachel Lewis", category: "SI", role: "User" },
];

const UsersManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Users Management</h1>
                <p className="text-sm text-gray-500">Manage system users and permissions</p>
              </div>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className={`inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${showForm
                ? "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                : "bg-green-600 text-white hover:bg-green-700 shadow-sm"
                }`}
            >
              {showForm ? (
                <><X className="w-4 h-4 mr-1.5" /> Cancel</>
              ) : (
                <><UserPlus className="w-4 h-4 mr-1.5" /> Add User</>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Create New User</h3>
                  <p className="text-sm text-gray-500">Fill in the details to add a new user.</p>
                </div>
                <div className="p-6">
                  <form className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input placeholder="e.g. John Doe" className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Username</label>
                        <input placeholder="e.g. jdoe88" className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input type="password" placeholder="••••••••" className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" placeholder="••••••••" className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                          <option>SI</option>
                          <option>NETWORK</option>
                          <option>Frontend</option>
                          <option>Backend</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Role</label>
                        <select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                          <option>Admin</option>
                          <option>Editor</option>
                          <option>User</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                      <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                      </button>
                      <button type="submit" className="px-4 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 shadow-sm">
                        Save User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
            <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
              {filteredUsers.length} of {users.length}
            </span>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredUsers.map((user, i) => (
            <AdminUserComponent
              key={user.id}
              username={user.username}
              fullName={user.fullName}
              category={user.category}
              role={user.role}
              index={i}
            />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No users found</p>
            <p className="text-sm text-gray-400">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
