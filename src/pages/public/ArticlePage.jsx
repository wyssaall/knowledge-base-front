import React from 'react'
import ArticleComponent from '../../components/ArticleComponent.jsx'

function ArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* HERO SECTION */}
      <div className="relative pt-24 pb-32 px-6 md:px-16 bg-gradient-to-br from-[#0f3d2e] via-[#145c3a] to-[#0f3d2e] text-white overflow-hidden">
        
        {/* Soft background glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-green-300 font-semibold tracking-widest text-sm mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-green-400"></span> KNOWLEDGE BASE
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
              Read. Learn. <br/><span className="text-green-400 relative">Build.<span className="absolute bottom-1 left-0 w-full h-3 bg-green-500/30 -z-10 rounded"></span></span>
            </h1>

            <p className="text-lg md:text-xl text-green-100/90 leading-relaxed max-w-xl">
              Hand-crafted guides, insights, and resources to help you master new skills and build better software.
            </p>
          </div>

          {/* SEARCH */}
          <div className="w-full md:w-[400px]">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input
                type="text"
                placeholder="Search articles, topics..."
                className="w-full pl-11 pr-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-md transition-all shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="px-4 md:px-10 -mt-20 pb-20 relative z-20">
        <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-900/10 border border-white p-6 md:p-12">
          
          {/* HEADER / FILTERS */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <h3 className="text-3xl font-bold text-gray-800 tracking-tight">Latest Articles</h3>
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'SI', 'NETWORK'].map((category, idx) => (
                <button key={category} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${idx === 0 ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* GRID */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ArticleComponent />
            <ArticleComponent />
            <ArticleComponent />
            <ArticleComponent />
            <ArticleComponent />
            <ArticleComponent />
          </div>

          {/* LOAD MORE */}
          <div className="flex justify-center mt-14">
            <button className="px-8 py-3.5 rounded-xl bg-white text-gray-700 border border-gray-200 stroke-gray-300 shadow-sm hover:shadow-md hover:border-green-300 hover:text-green-700 transition-all font-semibold flex items-center gap-2 group">
              Load more articles
              <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ArticlePage