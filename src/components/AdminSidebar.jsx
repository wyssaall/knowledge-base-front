import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSidebar = () => {
  const menuItems = [
    { 
      title: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      title: 'Articles', 
      path: '/admin/articles', 
      icon: <FileText size={20} /> 
    },
    { 
      title: 'Utilisateurs', 
      path: '/admin/users', 
      icon: <Users size={20} /> 
    },
    { 
      title: 'Paramètres', 
      path: '/admin/settings', 
      icon: <Settings size={20} /> 
    },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0">
      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
        <div className="mb-4">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">
            Main Menu
          </p>
        </div>
        
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-green-50 text-green-700 font-semibold' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <span className={`transition-colors duration-200 ${isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.title}</span>
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="w-1.5 h-1.5 rounded-full bg-green-600"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200">
          <LogOut size={18} />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
