import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, FileText, PlusCircle } from "lucide-react";
import AdminArticleComponent from "../../components/AdminArticleComponent.jsx";

const articles = [
  { id: 1, title: "Build scalable apps with clean architecture", category: "SI", date: "April 4, 2026", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085" },
  { id: 2, title: "Mastering React performance optimization", category: "Frontend", date: "April 5, 2026", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085" },
  { id: 3, title: "Setting up a robust Network infrastructure", category: "NETWORK", date: "April 6, 2026", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085" },
  { id: 4, title: "Advanced database sharding techniques", category: "Backend", date: "April 7, 2026", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085" },
  { id: 5, title: "Zero Trust Architecture Explained", category: "SI", date: "April 8, 2026", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085" },
];

const ArticlesManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Articles Management</h1>
                <p className="text-sm text-gray-500">Manage your knowledge base: add, edit or remove articles</p>
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
                <><PlusCircle className="w-4 h-4 mr-1.5" /> Add Article</>
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
                  <h3 className="text-lg font-semibold text-gray-900">Create New Article</h3>
                  <p className="text-sm text-gray-500">Fill in the details to publish a new article.</p>
                </div>
                <div className="p-6">
                  <form className="space-y-5">
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Article Title</label>
                      <input placeholder="e.g. Setting up a robust Network infrastructure" className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
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
                        <label className="text-sm font-medium text-gray-700">Cover Image URL</label>
                        <input type="url" placeholder="https://..." className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Content</label>
                      <textarea rows="5" placeholder="Write your article content here..." className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                      <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                      </button>
                      <button type="submit" className="px-4 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 shadow-sm">
                        Publish Article
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
            <h2 className="text-lg font-semibold text-gray-900">All Published Articles</h2>
            <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
              {filteredArticles.length} of {articles.length}
            </span>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredArticles.map((article, i) => (
            <AdminArticleComponent
              key={article.id}
              title={article.title}
              category={article.category}
              date={article.date}
              image={article.image}
              index={i}
            />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No articles found</p>
            <p className="text-sm text-gray-400">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesManagement;