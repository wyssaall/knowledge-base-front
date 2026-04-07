import React from "react";
import { motion } from "framer-motion";
import { Shield, Edit2, Trash2 } from "lucide-react";

const roleStyles = {
  Administrateur: "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm shadow-emerald-50",
  Technicien: "bg-blue-100 text-blue-700 border-blue-200 shadow-sm shadow-blue-50",
};

const categoryColors = {
  SI: "bg-emerald-600 text-white",
  NETWORK: "bg-blue-500 text-white",
  Frontend: "bg-amber-500 text-white",
  Backend: "bg-rose-500 text-white",
};

const AdminUserComponent = ({ id, username, fullName, category, role, index = 0, onEdit, onDelete }) => {
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center text-sm font-extrabold text-emerald-700 border border-emerald-100 shadow-xs">
            {initials}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight tracking-tight group-hover:text-emerald-700 transition-colors">{fullName}</h3>
            <p className="text-xs text-gray-500 font-medium">@{username}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-lg shadow-sm ${categoryColors[category] || "bg-gray-700 text-white"}`}>
          {category}
        </span>
        <span className={`text-[11px] font-bold px-3 py-1 rounded-lg border flex items-center gap-1.5 ${roleStyles[role] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
          <Shield className="w-3.5 h-3.5" />
          {role}
        </span>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        <button 
          onClick={() => onEdit({ id, username, fullName, category, role })}
          className="flex-1 text-[11px] font-bold h-9 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 transition-all text-gray-600 border border-transparent hover:border-emerald-100"
        >
          <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Modifier
        </button>
        <button 
          onClick={() => onDelete(id)}
          className="w-10 text-xs h-9 flex items-center justify-center rounded-xl text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all border border-transparent"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default AdminUserComponent;

