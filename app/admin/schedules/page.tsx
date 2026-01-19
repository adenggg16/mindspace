'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, onSnapshot, addDoc, doc, deleteDoc, query, orderBy, Timestamp 
} from 'firebase/firestore';

interface Schedule {
  id: string;
  date: Date;
  time: string;
  studentName: string;
  psychologistId: string;
  psychologistName: string;
  status: string;
}

export default function ManageSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [psychologists, setPsychologists] = useState<{id: string, name: string}[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ date: '', time: '', studentName: '', psychologistId: '' });

  useEffect(() => {
    // Ambil data psikolog untuk dropdown
    const unsubPsychs = onSnapshot(collection(db, 'psychologists'), (snap) => {
      setPsychologists(snap.docs.map(d => ({
        id: d.id,
        name: d.data().name || d.data().Name || "Tanpa Nama"
      })));
    });

    // Ambil data jadwal untuk tabel
    const q = query(collection(db, 'schedules'), orderBy('date', 'asc'));
    const unsubSchedules = onSnapshot(q, (snap) => {
      setSchedules(snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
        date: d.data().date instanceof Timestamp ? d.data().date.toDate() : new Date(d.data().date)
      } as Schedule)));
    });

    return () => { unsubPsychs(); unsubSchedules(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPsych = psychologists.find(p => p.id === formData.psychologistId);
    await addDoc(collection(db, 'schedules'), {
      studentName: formData.studentName,
      date: Timestamp.fromDate(new Date(formData.date)),
      time: formData.time,
      psychologistId: formData.psychologistId,
      psychologistName: selectedPsych?.name || 'Tanpa Nama',
      status: 'scheduled'
    });
    setShowForm(false);
    setFormData({ date: '', time: '', studentName: '', psychologistId: '' });
  };
  return (
    <div className="flex min-h-screen bg-[#e8f1fd]">
     
      {/* MAIN CONTENT - SESUAI GAMBAR */}
      <main className="flex-1 p-12">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">
  Manage Consultation Schedule
</h2>
        
        <button 
          onClick={() => setShowForm(true)}
          className="bg-[#c48b8b] hover:bg-[#b37a7a] text-white px-6 py-2 rounded-xl mb-8 font-semibold shadow-sm transition-colors"
        >
          Add Schedule
        </button>

        {/* TABEL - SESUAI GAMBAR */}
        <div className="bg-white rounded-[30px] shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-[#f8fafd] text-gray-400 text-xs uppercase font-semibold">
              <tr>
                <th className="p-6">Date</th>
                <th className="p-6">Time</th>
                <th className="p-6">Student</th>
                <th className="p-6">Psychologist</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {schedules.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 text-gray-700 font-medium">{s.date.toLocaleDateString('en-GB')}</td>
                  <td className="p-6 text-gray-700">{s.time}</td>
                  <td className="p-6 text-gray-800 font-semibold">{s.studentName}</td>
                  <td className="p-6 text-gray-600">{s.psychologistName}</td>
                  <td className="p-6">
                    <span className="text-gray-600 lowercase">{s.status}</span>
                  </td>
                  <td className="p-6 flex justify-center gap-2">
                    <button className="bg-[#ffcc00] text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm">Edit</button>
                    <button onClick={() => deleteDoc(doc(db, 'schedules', s.id))} className="bg-[#ff3b30] text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL FORM */}
        {showForm && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-[30px] w-full max-w-md shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Add Schedule</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Student Name" className="w-full p-3 border border-gray-100 rounded-xl" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} required />
                <input type="date" className="w-full p-3 border border-gray-100 rounded-xl" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
                <input type="time" className="w-full p-3 border border-gray-100 rounded-xl" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
                <select className="w-full p-3 border border-gray-100 rounded-xl bg-white" value={formData.psychologistId} onChange={e => setFormData({...formData, psychologistId: e.target.value})} required>
                  <option value="">Select Psychologist</option>
                  {psychologists.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-[#e91e63] text-white rounded-xl font-bold shadow-md">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}