"use client"

import DashboardNavbar from "@/components/dashboard/navbar"

interface Article {
  id: number
  title: string
  description: string
  icon: string
}

const articles: Article[] = [
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
  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <DashboardNavbar />

      <main className="flex-1 px-6 py-12 md:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="text-center text-gray-600 text-sm border-t pt-8">
            <p>
              This article is intended for educational purposes only and does not replace professional psychological
              diagnosis or treatment.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

interface ArticleCardProps {
  article: Article
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-blue-50 rounded-3xl p-8 shadow-sm flex flex-row gap-6 items-start">
      {/* Icon di kiri atas */}
      <div className="flex-shrink-0">
        <img 
          src={`/images/${article.icon}`} 
          alt={article.title} 
          className="w-16 h-16 md:w-20 md:h-20 object-contain" 
        />
      </div>

      {/* Konten teks di kanan */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {article.title}
        </h3>

        <p className="text-gray-700 text-sm mb-8">
          {article.description}
        </p>

        {/* Button panjang dengan arrow besar di kanan */}
        <button className="bg-gray-900 text-white font-bold text-base py-3 px-8 rounded-full hover:bg-gray-800 transition-colors self-start flex items-center gap-3 min-w-48 justify-center">
          Read Article
          <span className="text-2xl font-bold leading-none">&gt;</span>
        </button>
      </div>
    </div>
  )
}