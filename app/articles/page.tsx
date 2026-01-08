"use client"

import { useState } from "react"
import DashboardNavbar from "@/components/dashboard/navbar"
import { ArticleModal } from "@/components/ArticleModal"
import { articlesData, ArticleDetail } from "@/lib/articlesData"

// Simple article list for the main page (without detailed content)
interface ArticleCard {
  id: number
  title: string
  description: string
  icon: string
}

const articles: ArticleCard[] = [
  {
    id: 1,
    title: "Stress & Emotional Well-being",
    description: "Understanding how stress affects emotions and how to manage it in daily life.",
    icon: "stress.png",
  },
  {
    id: 2,
    title: "Emotional Intelligence Skills",
    description: "Learn how emotional intelligence helps build healthier coping strategies.",
    icon: "emotionall.png",
  },
  {
    id: 3,
    title: "Building Psychological Resilience",
    description: "Discover how to strengthen resilience during challenging life situations.",
    icon: "resilence.png",
  },
  {
    id: 4,
    title: "Anxiety and Emotional Awareness",
    description: "Understanding anxiety and the importance of recognizing emotional signals.",
    icon: "anxiety.png",
  },
  {
    id: 5,
    title: "Coping with Academic Stress",
    description: "Effective strategies to manage academic pressure and maintain mental balance.",
    icon: "academic.png",
  },
  {
    id: 6,
    title: "The Role of Social Support in Mental Health",
    description: "How social connections contribute to emotional well-being.",
    icon: "social.png",
  },
  {
    id: 7,
    title: "Mindfulness and Emotional Regulation",
    description: "Using mindfulness to improve emotional balance and awareness.",
    icon: "mindfulness.png",
  },
  {
    id: 8,
    title: "Self-Care and Psychological Well-being",
    description: "The importance of daily self-care for maintaining mental health.",
    icon: "selfcare.png",
  },
  {
    id: 9,
    title: "Sleep and Mental Well-being",
    description: "Understanding the relationship between sleep and emotional health.",
    icon: "sleep.png",
  },
]

export default function ArticlesPage() {
  const [selectedArticle, setSelectedArticle] = useState<ArticleDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleArticleClick = (articleId: number) => {
    const article = articlesData.find((a) => a.id === articleId)
    if (article) {
      setSelectedArticle(article)
      setIsModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-200 to-blue-50">
      <DashboardNavbar />

      <main className="flex-1 px-6 py-12 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => handleArticleClick(article.id)}
            />
          ))}
        </div>

        <div className="text-center text-gray-600 text-sm mt-12 bg-white/70 backdrop-blur-sm py-6 rounded-2xl">
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


interface ArticleCardProps {
  article: ArticleCard
  onClick: () => void
}

function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl p-8 shadow-md flex flex-col items-start cursor-pointer transition-all hover:shadow-lg hover:scale-105 duration-300"
    >
      {/* Title dengan border bottom tipis */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
        {article.title}
      </h3>

      {/* Icon dan description di tengah */}
      <div className="flex flex-col items-center text-center mb-8 flex-1">
        <img
          src={`/images/${article.icon}`}
          alt={article.title}
          className="w-24 h-24 md:w-32 md:h-32 object-contain mb-6"
        />
        <p className="text-gray-700 text-base leading-relaxed">
          {article.description}
        </p>
      </div>

      {/* Button di bawah */}
      <button className="bg-gray-900 text-white font-semibold text-base py-3 px-10 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-3 mx-auto">
        Read Article
        <span className="text-2xl font-bold leading-none">&gt;</span>
      </button>
    </div>
  )
}