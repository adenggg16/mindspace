'use client';

import { useEffect, useState } from 'react';
// import { db } from '@/lib/firebase';
// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  date: Date;
  description: string;
}

export default function ManagePayments() {
  // Mock data
  const [payments, setPayments] = useState<Payment[]>([
    { id: '1', studentId: '1', studentName: 'John Doe', amount: 50000, status: 'pending', date: new Date(), description: 'Konsultasi 1' },
    { id: '2', studentId: '2', studentName: 'Jane Smith', amount: 75000, status: 'confirmed', date: new Date(), description: 'Konsultasi 2' },
  ]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchPayments = async () => {
  //     try {
  //       const paymentsSnapshot = await getDocs(collection(db, 'payments'));
  //       const paymentsData: Payment[] = [];
  //       paymentsSnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         paymentsData.push({
  //           id: doc.id,
  //           studentId: data.studentId,
  //           studentName: data.studentName,
  //           amount: data.amount,
  //           status: data.status,
  //           date: data.date.toDate(),
  //           description: data.description,
  //         });
  //       });
  //       setPayments(paymentsData);
  //     } catch (error) {
  //       console.error('Error fetching payments:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPayments();
  // }, []);

  const confirmPayment = async (paymentId: string) => {
    setPayments(payments.map(p => p.id === paymentId ? { ...p, status: 'confirmed' } : p));
    // try {
    //   await updateDoc(doc(db, 'payments', paymentId), { status: 'confirmed' });
    //   setPayments(payments.map(p => p.id === paymentId ? { ...p, status: 'confirmed' } : p));
    // } catch (error) {
    //   console.error('Error confirming payment:', error);
    // }
  };

  const cancelPayment = async (paymentId: string) => {
    setPayments(payments.map(p => p.id === paymentId ? { ...p, status: 'cancelled' } : p));
    // try {
    //   await updateDoc(doc(db, 'payments', paymentId), { status: 'cancelled' });
    //   setPayments(payments.map(p => p.id === paymentId ? { ...p, status: 'cancelled' } : p));
    // } catch (error) {
    //   console.error('Error cancelling payment:', error);
    // }
  };

  // if (loading) {
  //   return <div className="text-center">Loading...</div>;
  // }

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">Pembayaran</h1>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-[#B58D97]/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
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
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.status === 'pending' && (
                    <>
                      <button
                        onClick={() => confirmPayment(payment.id)}
                        className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                      >
                        Konfirmasi
                      </button>
                      <button
                        onClick={() => cancelPayment(payment.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                      >
                        Batalkan
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}