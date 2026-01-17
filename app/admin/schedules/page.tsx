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
    { id: '1', date: new Date('2026-01-09'), time: '10:00', studentName: 'Khalisa Azzahra', psychologistId: '6', psychologistName: 'Dr. Miftahul Jannah, M.Psi., Psikolog', status: 'scheduled' },
    { id: '2', date: new Date('2026-01-09'), time: '11:30', studentName: 'Salsabila Adelia Putrie', psychologistId: '7', psychologistName: 'Dr. Nadia Wulandari, M.Psi., Psikolog', status: 'scheduled' },
    { id: '3', date: new Date('2026-01-10'), time: '14:00', studentName: 'Ayu Agustyna Hoky', psychologistId: '8', psychologistName: 'Dr. Dian, M.Psi., Psikolog', status: 'scheduled' },
    { id: '4', date: new Date('2026-01-11'), time: '09:00', studentName: 'Muhammad', psychologistId: '6', psychologistName: 'Dr. Miftahul Jannah, M.Psi., Psikolog', status: 'scheduled' },
    { id: '5', date: new Date('2026-01-13'), time: '16:00', studentName: 'Reyhan Zayyan', psychologistId: '7', psychologistName: 'Dr. Nadia Wulandari, M.Psi., Psikolog', status: 'completed' },
  ]);
  const [psychologists, setPsychologists] = useState<Psychologist[]>([
    { id: '6', name: 'Dr. Miftahul Jannah, M.Psi., Psikolog' },
    { id: '7', name: 'Dr. Nadia Wulandari, M.Psi., Psikolog' },
    { id: '8', name: 'Dr. Dian, M.Psi., Psikolog' },
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
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">Manage Consultation Schedule</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-6 py-3 bg-[#B58D97] hover:bg-[#d4779b] text-white rounded-2xl shadow-lg transition-colors duration-200"
      >
        Add Schedule
      </button>

      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30 w-96 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900">{editingSchedule ? 'Edit Schedule' : 'Add Schedule'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">Student Name</label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">Psychologist</label>
                <select
                  value={formData.psychologistId}
                  onChange={(e) => setFormData({ ...formData, psychologistId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B58D97] focus:border-transparent"
                >
                  <option value="">Select Psychologist</option>
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
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B58D97] hover:bg-[#d4779b] text-white rounded-lg transition-colors duration-200"
                >
                  Save
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Psychologist</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
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
                    Delete
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