'use client';

import { useEffect, useState } from 'react';
// import { db } from '@/lib/firebase';
// import { collection, getDocs } from 'firebase/firestore';

interface Consultation {
  id: string;
  studentName: string;
  psychologistName: string;
  date: Date;
  status: string;
  notes?: string;
}

interface Payment {
  id: string;
  studentName: string;
  amount: number;
  status: string;
  date: Date;
  description: string;
}

export default function Reports() {
  // Mock data
  const [consultations, setConsultations] = useState<Consultation[]>([
    { id: '1', studentName: 'John Doe', psychologistName: 'Dr. Alice', date: new Date(), status: 'completed', notes: 'Sesi berjalan baik' },
    { id: '2', studentName: 'Jane Smith', psychologistName: 'Dr. Bob', date: new Date(), status: 'scheduled' },
  ]);
  const [payments, setPayments] = useState<Payment[]>([
    { id: '1', studentName: 'John Doe', amount: 50000, status: 'confirmed', date: new Date(), description: 'Konsultasi 1' },
    { id: '2', studentName: 'Jane Smith', amount: 75000, status: 'pending', date: new Date(), description: 'Konsultasi 2' },
  ]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchReports = async () => {
  //     try {
  //       // Fetch consultations
  //       const consultationsSnapshot = await getDocs(collection(db, 'consultations'));
  //       const consultationsData: Consultation[] = [];
  //       consultationsSnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         consultationsData.push({
  //           id: doc.id,
  //           studentName: data.studentName,
  //           psychologistName: data.psychologistName,
  //           date: data.date.toDate(),
  //           status: data.status,
  //           notes: data.notes,
  //         });
  //       });
  //       setConsultations(consultationsData);

  //       // Fetch payments
  //       const paymentsSnapshot = await getDocs(collection(db, 'payments'));
  //       const paymentsData: Payment[] = [];
  //       paymentsSnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         paymentsData.push({
  //           id: doc.id,
  //           studentName: data.studentName,
  //           amount: data.amount,
  //           status: data.status,
  //           date: data.date.toDate(),
  //           description: data.description,
  //         });
  //       });
  //       setPayments(paymentsData);
  //     } catch (error) {
  //       console.error('Error fetching reports:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchReports();
  // }, []);

  // if (loading) {
  //   return <div className="text-center">Loading...</div>;
  // }

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">Laporan</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Riwayat Konseling</h2>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-[#B58D97]/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Psikolog</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catatan</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {consultations.map((consultation) => (
                <tr key={consultation.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">{consultation.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{consultation.psychologistName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{consultation.date.toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{consultation.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{consultation.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Riwayat Pembayaran</h2>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-[#B58D97]/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">{payment.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">Rp {payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.date.toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status === 'confirmed' ? 'Dikonfirmasi' :
                       payment.status === 'pending' ? 'Pending' : 'Dibatalkan'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}