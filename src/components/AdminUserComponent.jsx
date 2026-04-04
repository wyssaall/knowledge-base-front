import React from "react";
import { motion } from "framer-motion";
import { Shield, Edit2, Trash2 } from "lucide-react";

const roleStyles = {
  Admin: "bg-green-100 text-green-700 border-green-200",
  Editor: "bg-yellow-100 text-yellow-700 border-yellow-200",
  User: "bg-blue-100 text-blue-700 border-blue-200",
};

const categoryColors = {
  SI: "bg-green-600 text-white",
  NETWORK: "bg-blue-500 text-white",
  Frontend: "bg-yellow-500 text-white",
  Backend: "bg-red-500 text-white",
};

const AdminUserComponent = ({ username, fullName, category, role, index = 0 }) => {
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-green-300 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center text-sm font-bold text-green-700">
            {initials}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 leading-tight">{fullName}</h3>
            <p className="text-xs text-gray-500 font-mono">@{username}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${categoryColors[category] || "bg-gray-200 text-gray-600"}`}>
          {category}
        </span>
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${roleStyles[role] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
          <Shield className="w-3 h-3 inline-block mr-1 -mt-0.5" />
          {role}
        </span>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="flex-1 text-xs h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
          <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
        </button>
        <button className="flex-1 text-xs h-8 flex items-center justify-center rounded-md text-red-500 hover:bg-red-50 transition-colors">
          <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
        </button>
      </div>
    </motion.div>
  );
};

export default AdminUserComponent;
