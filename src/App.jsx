import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import ArticlePage from './pages/public/ArticlePage.jsx'
import ArticlesManagement from './pages/admin/ArticlesManagement.jsx'
import UsersManagement from './pages/admin/UsersManagement.jsx'
import AdminLayout from './layouts/AdminLayout'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route - Only ArticlePage */}
        <Route path="/" element={<ArticlePage />} />

        {/* Admin Section with Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Redirect /admin to /admin/articles */}
          <Route index element={<Navigate to="/admin/articles" replace />} />
          <Route path="articles" element={<ArticlesManagement />} />
          <Route path="users" element={<UsersManagement />} />
          
          <Route 
            path="dashboard" 
            element={
              <div className="p-8">
                <h1 className="text-3xl font-bold mb-4 text-gray-900">Tableau de Bord</h1>
                <p className="text-gray-600">Bienvenue dans l'interface d'administration.</p>
              </div>
            } 
          />
          <Route 
            path="settings" 
            element={
              <div className="p-8">
                <h1 className="text-3xl font-bold mb-4 text-gray-900">Paramètres</h1>
                <p className="text-gray-600">Configuration générale du système.</p>
              </div>
            } 
          />
        </Route>

        {/* Global Fallback Redirect to Public Article Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}


export default App

