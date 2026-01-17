'use client';

import { useEffect, useState } from 'react';
// import { db } from '@/lib/firebase';
// import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  author: string;
  createdAt: Date;
}

export default function ManageArticles() {
  const [mounted, setMounted] = useState(false);

  // Mock data
  const [articles, setArticles] = useState<Article[]>([
    { id: '1', title: 'Stress & Emotional Well-being', description: 'Understanding how stress affects emotions and how to manage it in daily life.', content: 'Konten artikel 1', icon: 'stress.png', author: 'Admin', createdAt: new Date('2024-01-01') },
    { id: '2', title: 'Emotional Intelligence Skills', description: 'Learn how emotional intelligence helps build healthier coping strategies.', content: 'Konten artikel 2', icon: 'emotionall.png', author: 'Admin', createdAt: new Date('2024-01-02') },
    { id: '3', title: 'Building Psychological Resilience', description: 'Discover how to strengthen resilience during challenging life situations.', content: 'Konten artikel 3', icon: 'resilence.png', author: 'Admin', createdAt: new Date('2024-01-03') },
    { id: '4', title: 'Anxiety and Emotional Awareness', description: 'Understanding anxiety and the importance of recognizing emotional signals.', content: 'Konten artikel 4', icon: 'anxiety.png', author: 'Admin', createdAt: new Date('2024-01-04') },
    { id: '5', title: 'Coping with Academic Stress', description: 'Effective strategies to manage academic pressure and maintain mental balance.', content: 'Konten artikel 5', icon: 'academic.png', author: 'Admin', createdAt: new Date('2024-01-05') },
    { id: '6', title: 'The Role of Social Support in Mental Health', description: 'How social connections contribute to emotional well-being.', content: 'Konten artikel 6', icon: 'social.png', author: 'Admin', createdAt: new Date('2024-01-06') },
    { id: '7', title: 'Mindfulness and Emotional Regulation', description: 'Using mindfulness to improve emotional balance and awareness.', content: 'Konten artikel 7', icon: 'mindfulness.png', author: 'Admin', createdAt: new Date('2024-01-07') },
    { id: '8', title: 'Self-Care and Psychological Well-being', description: 'The importance of daily self-care for maintaining mental health.', content: 'Konten artikel 8', icon: 'selfcare.png', author: 'Admin', createdAt: new Date('2024-01-08') },
    { id: '9', title: 'Sleep and Mental Well-being', description: 'Understanding the relationship between sleep and emotional health.', content: 'Konten artikel 9', icon: 'sleep.png', author: 'Admin', createdAt: new Date('2024-01-09') },
  ]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    icon: '',
    author: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     try {
  //       const articlesSnapshot = await getDocs(collection(db, 'articles'));
  //       const articlesData: Article[] = [];
  //       articlesSnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         articlesData.push({
  //           id: doc.id,
  //           title: data.title,
  //           content: data.content,
  //           author: data.author,
  //           createdAt: data.createdAt.toDate(),
  //         });
  //       });
  //       setArticles(articlesData);
  //     } catch (error) {
  //       console.error('Error fetching articles:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchArticles();
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const articleData = {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      icon: formData.icon,
      author: formData.author,
      createdAt: new Date(),
    };

    if (editingArticle) {
      setArticles(articles.map(a => a.id === editingArticle.id ? { ...a, ...articleData } : a));
    } else {
      const newId = (articles.length + 1).toString();
      setArticles([...articles, { id: newId, ...articleData }]);
    }

    setShowForm(false);
    setEditingArticle(null);
    setFormData({ title: '', description: '', content: '', icon: '', author: '' });
    // try {
    //   if (editingArticle) {
    //     await updateDoc(doc(db, 'articles', editingArticle.id), articleData);
    //     setArticles(articles.map(a => a.id === editingArticle.id ? { ...a, ...articleData } : a));
    //   } else {
    //     const docRef = await addDoc(collection(db, 'articles'), articleData);
    //     setArticles([...articles, { id: docRef.id, ...articleData }]);
    //   }

    //   setShowForm(false);
    //   setEditingArticle(null);
    //   setFormData({ title: '', content: '', author: '' });
    // } catch (error) {
    //   console.error('Error saving article:', error);
    // }
  };

  const deleteArticle = async (articleId: string) => {
    setArticles(articles.filter(a => a.id !== articleId));
  };

  // if (loading) {
  //   return <div className="text-center">Loading...</div>;
  // }

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-blue-100 py-8 md:py-12">
      <main className="px-4 md:px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Kelola Artikel</h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-[#B58D97] hover:bg-[#d4779b] text-white font-semibold rounded-2xl shadow-lg transition-colors duration-200 w-full md:w-auto"
          >
            + Tambah Artikel
          </button>
        </div>

      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{editingArticle ? 'Edit Artikel' : 'Tambah Artikel'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Judul</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Deskripsi Singkat</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  rows={2}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Konten</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Nama Icon File (e.g., stress.png)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Penulis</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingArticle(null);
                    setFormData({ title: '', description: '', content: '', icon: '', author: '' });
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#B58D97] hover:bg-[#d4779b] text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl md:rounded-3xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
          >
            {/* Title */}
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 pb-2 md:pb-3 border-b border-gray-200">
              {article.title}
            </h3>

            {/* Icon dan description di tengah */}
            <div className="flex flex-col items-center text-center mb-6 md:mb-8 flex-1">
              <img
                src={`/images/${article.icon}`}
                alt={article.title}
                className="w-20 h-20 md:w-32 md:h-32 object-contain mb-4 md:mb-6"
              />
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {article.description}
              </p>
            </div>

            {/* Info & Actions */}
            <div className="space-y-3 md:space-y-4">
              <div className="text-xs md:text-sm text-gray-500 border-t pt-3 md:pt-4">
                <p><span className="font-medium">Penulis:</span> {article.author}</p>
                <p><span className="font-medium">Dibuat:</span> {article.createdAt.toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2 md:gap-3 justify-center">
                <button
                  onClick={() => {
                    setEditingArticle(article);
                    setFormData({
                      title: article.title,
                      description: article.description,
                      content: article.content,
                      icon: article.icon,
                      author: article.author,
                    });
                    setShowForm(true);
                  }}
                  className="flex-1 px-3 md:px-4 py-2 bg-yellow-500 text-white text-sm md:text-base rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteArticle(article.id)}
                  className="flex-1 px-3 md:px-4 py-2 bg-red-500 text-white text-sm md:text-base rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </main>
    </div>
  );
}