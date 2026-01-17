'use client';

import { useEffect, useState } from 'react';
// import { db } from '@/lib/firebase';
// import { collection, getDocs, query, where } from 'firebase/firestore';

interface SummaryData {
  totalStudents: number;
  totalPsychologists: number;
  todaysSchedules: number;
  totalPayments: number;
}

export default function AdminDashboard() {
  // Mock data based on actual client and psychologist data
  const [data, setData] = useState<SummaryData>({
    totalStudents: 5,
    totalPsychologists: 3,
    todaysSchedules: 2,
    totalPayments: 3,
  });
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchSummary = async () => {
  //     try {
  //       // Total Students
  //       const studentsQuery = query(collection(db, 'users'), where('role', '==', 'student'), where('active', '==', true));
  //       const studentsSnapshot = await getDocs(studentsQuery);
  //       const totalStudents = studentsSnapshot.size;

  //       // Total Psychologists
  //       const psychologistsQuery = query(collection(db, 'users'), where('role', '==', 'psychologist'), where('active', '==', true));
  //       const psychologistsSnapshot = await getDocs(psychologistsQuery);
  //       const totalPsychologists = psychologistsSnapshot.size;

  //       // Today's Schedules
  //       const today = new Date();
  //       const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  //       const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  //       const schedulesQuery = query(collection(db, 'schedules'), where('date', '>=', startOfDay), where('date', '<', endOfDay));
  //       const schedulesSnapshot = await getDocs(schedulesQuery);
  //       const todaysSchedules = schedulesSnapshot.size;

  //       // Total Payments
  //       const paymentsSnapshot = await getDocs(collection(db, 'payments'));
  //       const totalPayments = paymentsSnapshot.size;

  //       setData({
  //         totalStudents,
  //         totalPsychologists,
  //         todaysSchedules,
  //         totalPayments,
  //       });
  //     } catch (error) {
  //       console.error('Error fetching summary:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSummary();
  // }, []);

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Total Students</h2>
          <p className="text-4xl font-bold text-blue-600">{data.totalStudents}</p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Total Psychologists</h2>
          <p className="text-4xl font-bold text-green-600">{data.totalPsychologists}</p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Today's Consultations</h2>
          <p className="text-4xl font-bold text-purple-600">{data.todaysSchedules}</p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Total Payments</h2>
          <p className="text-4xl font-bold text-red-600">{data.totalPayments}</p>
        </div>
      </div>
    </div>
  );
}