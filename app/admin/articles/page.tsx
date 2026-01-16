'use client';

import { useEffect, useState } from 'react';
// import { db } from '@/lib/firebase';
// import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

export default function ManageArticles() {
  const [mounted, setMounted] = useState(false);

  // Mock data
  const [articles, setArticles] = useState<Article[]>([
    { id: '1', title: 'Artikel 1', content: 'Konten artikel 1', author: 'Admin', createdAt: new Date('2024-01-01') },
    { id: '2', title: 'Artikel 2', content: 'Konten artikel 2', author: 'Admin', createdAt: new Date('2024-01-02') },
  ]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
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
      content: formData.content,
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
    setFormData({ title: '', content: '', author: '' });
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
    // try {
    //   await deleteDoc(doc(db, 'articles', articleId));
    //   setArticles(articles.filter(a => a.id !== articleId));
    // } catch (error) {
    //   console.error('Error deleting article:', error);
    // }
  };

  // if (loading) {
  //   return <div className="text-center">Loading...</div>;
  // }

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">Kelola Artikel</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-6 py-3 bg-[#B58D97] hover:bg-[#d4779b] text-white rounded-2xl shadow-lg transition-colors duration-200"
      >
        Tambah Artikel
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30 w-96 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900">{editingArticle ? 'Edit Artikel' : 'Tambah Artikel'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">Judul</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">Konten</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  rows={4}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">Penulis</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingArticle(null);
                    setFormData({ title: '', content: '', author: '' });
                  }}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B58D97] hover:bg-[#d4779b] text-white rounded-lg transition-colors duration-200"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-[#B58D97]/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penulis</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">{article.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{article.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">{article.createdAt.toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setEditingArticle(article);
                      setFormData({
                        title: article.title,
                        content: article.content,
                        author: article.author,
                      });
                      setShowForm(true);
                    }}
                    className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteArticle(article.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}