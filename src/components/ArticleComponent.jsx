import React from 'react'
import { useNavigate } from 'react-router-dom'

function ArticleComponent() {
  // const navigate = useNavigate()

  return (
    <div
      // onClick={() => navigate('/article/1')}
      className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-green-100 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >

      {/* IMAGE */}
      <div className="overflow-hidden h-52 w-full relative">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt="Article cover"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Categorie Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold tracking-wide text-green-700 shadow-sm">
          SI
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-6 gap-3">

        <p className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          April 4, 2026
        </p>

        <h2 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-green-600 transition-colors duration-200 line-clamp-2">
          Build scalable apps with clean architecture
        </h2>

        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          Learn how to structure your frontend and backend like a real developer using scalable patterns and best practices.
        </p>

        {/* Read more */}
        <div className="mt-auto pt-4 text-sm font-bold text-green-600 group-hover:text-green-700 flex items-center gap-1">
          Read Article 
          <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>

      </div>
    </div>
  )
}

export default ArticleComponent