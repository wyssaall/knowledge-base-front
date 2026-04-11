import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Tag,
  MessageSquareText,
  LogOut, 
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/api/auth/me', true);
        setUser(res.user);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    };
    fetchUser();
  }, []);

  const menuItems = [
    { 
      title: 'Articles', 
      path: `/${id}/articles`, 
      icon: <FileText size={20} />,
      roles: ['admin', 'technicien']
    },
    { 
      title: 'Utilisateurs', 
      path: `/${id}/users`, 
      icon: <Users size={20} />,
      roles: ['admin'] 
    },
    { 
      title: 'Categories', 
      path: `/${id}/categories`, 
      icon: <Tag size={20} />,
      roles: ['admin'] // Restricted to admin ONLY so tech can't add categories
    },
    { 
      title: 'Comments', 
      path: `/${id}/comments`, 
      icon: <MessageSquareText size={20} />,
      roles: ['admin'] 
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0">
      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
        <div className="mb-4">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">
            Main Menu
          </p>
        </div>
        
        {menuItems.filter(item => !user || item.roles.includes(user.role)).map((item) => (
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
        {user && (
          <div className="mb-4 flex flex-col items-center px-2">
            <div className="text-sm font-bold text-gray-800">{user.name}</div>
            <div className="text-xs text-gray-500 capitalize">{user.role}</div>
            <div className="text-xs font-semibold text-emerald-600 mt-1 uppercase tracking-wider">{user.domain?.name || user.domain || "Sans domaine"}</div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
