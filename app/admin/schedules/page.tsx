'use client';

import { useEffect, useState } from 'react';
// import { db } from '@/lib/firebase';
// import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';

interface Schedule {
  id: string;
  date: Date;
  time: string;
  studentName: string;
  psychologistId?: string | null;
  psychologistName?: string | null;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Psychologist {
  id: string;
  name: string;
}

export default function ManageSchedules() {
  // Mock data
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: '1', date: new Date(), time: '10:00', studentName: 'John Doe', psychologistId: '3', psychologistName: 'Dr. Alice', status: 'scheduled' },
    { id: '2', date: new Date(), time: '14:00', studentName: 'Jane Smith', status: 'scheduled' },
  ]);
  const [psychologists, setPsychologists] = useState<Psychologist[]>([
    { id: '3', name: 'Dr. Alice' },
    { id: '4', name: 'Dr. Bob' },
  ]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    studentName: '',
    psychologistId: '',
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch schedules
  //       const schedulesSnapshot = await getDocs(collection(db, 'schedules'));
  //       const schedulesData: Schedule[] = [];
  //       schedulesSnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         schedulesData.push({
  //           id: doc.id,
  //           date: data.date.toDate(),
  //           time: data.time,
  //           studentName: data.studentName,
  //           psychologistId: data.psychologistId,
  //           psychologistName: data.psychologistName,
  //           status: data.status,
  //         });
  //       });
  //       setSchedules(schedulesData);

  //       // Fetch psychologists
  //       const psychologistsQuery = query(collection(db, 'users'), where('role', '==', 'psychologist'), where('active', '==', true));
  //       const psychologistsSnapshot = await getDocs(psychologistsQuery);
  //       const psychologistsData: Psychologist[] = [];
  //       psychologistsSnapshot.forEach((doc) => {
  //         const data = doc.data() as { name: string };
  //         psychologistsData.push({ id: doc.id, name: data.name });
  //       });
  //       setPsychologists(psychologistsData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const scheduleData = {
      date: new Date(formData.date),
      time: formData.time,
      studentName: formData.studentName,
      psychologistId: formData.psychologistId || null,
      psychologistName: psychologists.find(p => p.id === formData.psychologistId)?.name || null,
      status: 'scheduled' as const,
    };

    if (editingSchedule) {
      setSchedules(schedules.map(s => s.id === editingSchedule.id ? { ...s, ...scheduleData } : s));
    } else {
      const newId = (schedules.length + 1).toString();
      setSchedules([...schedules, { id: newId, ...scheduleData }]);
    }

    setShowForm(false);
    setEditingSchedule(null);
    setFormData({ date: '', time: '', studentName: '', psychologistId: '' });
    // try {
    //   if (editingSchedule) {
    //     await updateDoc(doc(db, 'schedules', editingSchedule.id), scheduleData);
    //     setSchedules(schedules.map(s => s.id === editingSchedule.id ? { ...s, ...scheduleData } : s));
    //   } else {
    //     const docRef = await addDoc(collection(db, 'schedules'), scheduleData);
    //     setSchedules([...schedules, { id: docRef.id, ...scheduleData }]);
    //   }

    //   setShowForm(false);
    //   setEditingSchedule(null);
    //   setFormData({ date: '', time: '', studentName: '', psychologistId: '' });
    // } catch (error) {
    //   console.error('Error saving schedule:', error);
    // }
  };

  const assignPsychologist = async (scheduleId: string, psychologistId: string) => {
    const psychologist = psychologists.find(p => p.id === psychologistId);
    setSchedules(schedules.map(s => s.id === scheduleId ? { ...s, psychologistId, psychologistName: psychologist?.name } : s));
    // try {
    //   const psychologist = psychologists.find(p => p.id === psychologistId);
    //   await updateDoc(doc(db, 'schedules', scheduleId), {
    //     psychologistId,
    //     psychologistName: psychologist?.name,
    //   });
    //   setSchedules(schedules.map(s => s.id === scheduleId ? { ...s, psychologistId, psychologistName: psychologist?.name } : s));
    // } catch (error) {
    //   console.error('Error assigning psychologist:', error);
    // }
  };

  const deleteSchedule = async (scheduleId: string) => {
    setSchedules(schedules.filter(s => s.id !== scheduleId));
    // try {
    //   await deleteDoc(doc(db, 'schedules', scheduleId));
    //   setSchedules(schedules.filter(s => s.id !== scheduleId));
    // } catch (error) {
    //   console.error('Error deleting schedule:', error);
    // }
  };

  // if (loading) {
  //   return <div className="text-center">Loading...</div>;
  // }

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">Kelola Jadwal Konseling</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-6 py-3 bg-[#B58D97] hover:bg-[#d4779b] text-white rounded-2xl shadow-lg transition-colors duration-200"
      >
        Tambah Jadwal
      </button>

      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30 w-96 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900">{editingSchedule ? 'Edit Jadwal' : 'Tambah Jadwal'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">Tanggal</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">Waktu</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">Nama Mahasiswa</label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">Psikolog</label>
                <select
                  value={formData.psychologistId}
                  onChange={(e) => setFormData({ ...formData, psychologistId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                >
                  <option value="">Pilih Psikolog</option>
                  {psychologists.map((psychologist) => (
                    <option key={psychologist.id} value={psychologist.id}>
                      {psychologist.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSchedule(null);
                    setFormData({ date: '', time: '', studentName: '', psychologistId: '' });
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Psikolog</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schedules.map((schedule) => (
              <tr key={schedule.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">{schedule.date.toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{schedule.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{schedule.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {schedule.psychologistName || (
                    <select
                      onChange={(e) => assignPsychologist(schedule.id, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                      defaultValue=""
                    >
                      <option value="" disabled>Assign</option>
                      {psychologists.map((psychologist) => (
                        <option key={psychologist.id} value={psychologist.id}>
                          {psychologist.name}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{schedule.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setEditingSchedule(schedule);
                      setFormData({
                        date: schedule.date.toISOString().split('T')[0],
                        time: schedule.time,
                        studentName: schedule.studentName,
                        psychologistId: schedule.psychologistId || '',
                      });
                      setShowForm(true);
                    }}
                    className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSchedule(schedule.id)}
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