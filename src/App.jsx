import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import ArticlePage from './pages/public/ArticlePage.jsx'
import ArticleDetail from './pages/public/ArticleDetail.jsx'
import ArticlesManagement from './pages/admin/ArticlesManagement.jsx'
import UsersManagement from './pages/admin/UsersManagement.jsx'
import CategoriesManagement from './pages/admin/CategoriesManagement.jsx'
import CommentsManagement from './pages/admin/CommentsManagement.jsx'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route - Only ArticlePage */}
        <Route path="/" element={<ArticlePage />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Section with Layout */}
        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Redirect /:id to /:id/articles */}
          <Route index element={<Navigate to="articles" replace />} />
          <Route path="articles" element={<ArticlesManagement />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="comments" element={<CommentsManagement />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navigate to="/" replace />
            </ProtectedRoute>
          }
        />

        {/* Global Fallback Redirect to Public Article Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}


export default App

