import React from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2, Calendar } from "lucide-react";

const categoryColors = {
  SI: "bg-green-600 text-white",
  NETWORK: "bg-blue-500 text-white",
  Frontend: "bg-yellow-500 text-white",
  Backend: "bg-red-500 text-white",
};

const AdminArticleComponent = ({ title, category, date, image, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      className="group flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all duration-300 overflow-hidden"
    >
      {/* IMAGE */}
      <div className="overflow-hidden h-40 w-full relative">
        <img
          src={image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"}
          alt="Article cover"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Category Badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-sm ${categoryColors[category] || "bg-gray-700 text-white"}`}>
          {category}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-4 bg-white relative">
        <p className="text-[11px] font-medium text-gray-500 flex items-center gap-1.5 mb-2">
          <Calendar className="w-3.5 h-3.5" />
          {date}
        </p>

        <h2 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
          {title}
        </h2>

        {/* ACTIONS */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 min-h-[44px]">
          <button className="flex-1 text-xs h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors text-gray-700 font-medium">
            <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
          </button>
          <button className="flex-1 text-xs h-8 flex items-center justify-center rounded-md text-red-500 hover:bg-red-50 transition-colors font-medium">
            <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminArticleComponent;
