"use client"

import { useState, useEffect } from "react"
import DashboardNavbar from "@/components/dashboard/navbar"
import { ArticleModal } from "@/components/ArticleModal"
import { db } from "@/lib/firebase" 
import { collection, getDocs } from "firebase/firestore"
// AMBIL DARI SINI: agar id: string dan content-nya pas
import { ArticleDetail } from "@/lib/articlesData" 


export default function ArticlesPage() {

  const [articles, setArticles] = useState<ArticleDetail[]>([])
  const [selectedArticle, setSelectedArticle] = useState<ArticleDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"))
        const articlesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ArticleDetail[]
        
        setArticles(articlesData)
      } catch (error) {
        console.error("Error fetching articles: ", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const handleArticleClick = (article: ArticleDetail) => {
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <DashboardNavbar />

      <main className="flex-1 px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => handleArticleClick(article)}
              />
            ))}
          </div>
        )}

        <div className="text-center text-gray-600 text-xs md:text-sm mt-8 md:mt-12 bg-white/70 backdrop-blur-sm py-4 md:py-6 px-4 rounded-xl md:rounded-2xl">
          <p>
            This article is intended for educational purposes only and does not replace professional psychological
            diagnosis or treatment.
          </p>
        </div>
      </main>

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

// Update juga props di sini
interface ArticleCardProps {
  article: ArticleDetail
  onClick: () => void
}

function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl md:rounded-3xl p-6 md:p-8 shadow-md flex flex-col items-start cursor-pointer transition-all hover:shadow-lg hover:scale-105 duration-300"
    >
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 pb-2 md:pb-3 border-b border-gray-200 w-full">
        {article.title}
      </h3>

      <div className="flex flex-col items-center text-center mb-6 md:mb-8 flex-1 w-full">
        <img
          src={`/images/${article.icon}`}
          alt={article.title}
          className="w-20 h-20 md:w-32 md:h-32 object-contain mb-4 md:mb-6"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/default-icon.png"
          }}
        />
        <p className="text-gray-700 text-sm md:text-base leading-relaxed line-clamp-3">
          {article.description}
        </p>
      </div>

      <button className="bg-gray-900 text-white font-semibold text-sm md:text-base py-2 md:py-3 px-6 md:px-10 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-3 mx-auto">
        Read Article
        <span className="text-xl md:text-2xl font-bold leading-none">&gt;</span>
      </button>
    </div>
  )
}