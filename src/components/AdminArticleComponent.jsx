import { motion } from "framer-motion";
import { Edit2, Trash2, Calendar, CheckCircle, Clock } from "lucide-react";


const categoryColors = {
  SI: "bg-emerald-600 text-white",
  NETWORK: "bg-blue-500 text-white",
  Frontend: "bg-amber-500 text-white",
  Backend: "bg-rose-500 text-white",
};

const AdminArticleComponent = ({ 
  id,
  title, 
  category, 
  date, 
  image, 
  status = "Validated", 
  index = 0,
  onValidate,
  onDelete
}) => {
  const isPending = status === "Pending";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      {/* IMAGE */}
      <div className="overflow-hidden h-44 w-full relative">
        <img
          src={image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"}
          alt="Article cover"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase shadow-sm ${categoryColors[category] || "bg-gray-700 text-white"}`}>
          {category}
        </div>
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5 shadow-sm backdrop-blur-md ${
          isPending ? "bg-amber-100/90 text-amber-700 border border-amber-200" : "bg-emerald-100/90 text-emerald-700 border border-emerald-200"
        }`}>
          {isPending ? <Clock size={12} /> : <CheckCircle size={12} />}
          {isPending ? "Pending" : "Validated"}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-6 bg-white relative">
        <p className="text-[11px] font-bold text-gray-400 flex items-center gap-2 mb-3 uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          {date}
        </p>

        <h2 className="text-[15px] font-extrabold text-gray-900 leading-[1.4] line-clamp-2 min-h-[44px] group-hover:text-emerald-700 transition-colors duration-300 tracking-tight">
          {title}
        </h2>

        {/* ACTIONS */}
        <div className="mt-6 pt-5 border-t border-gray-50 flex items-center gap-3">
          {isPending ? (
            <button 
              onClick={() => onValidate(id)}
              className="flex-1 bg-emerald-600 text-white text-[11px] font-bold h-9 flex items-center justify-center rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100"
            >
              <CheckCircle className="w-3.5 h-3.5 mr-2" /> Valider
            </button>
          ) : (
            <button className="flex-1 text-[11px] h-9 flex items-center justify-center rounded-xl hover:bg-emerald-50 transition-all text-gray-600 font-bold border border-transparent hover:border-emerald-100 bg-gray-50">
              <Edit2 className="w-3.5 h-3.5 mr-2" /> Modifier
            </button>
          )}
          
          <button 
            onClick={() => onDelete(id)}
            className="w-10 text-xs h-9 flex items-center justify-center rounded-xl text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

    </motion.div>
  );
};

export default AdminArticleComponent;

