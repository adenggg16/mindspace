'use client';

import { useEffect, useState } from 'react';
// import { db } from '@/lib/firebase';
// import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'psychologist';
  active: boolean;
}

export default function ManageUsers() {
  // Mock data
  const [students, setStudents] = useState<User[]>([
    { id: '1', name: 'Khalisa Azzahra', email: 'khalisa.azzahra@student.edu', role: 'student', active: true },
    { id: '2', name: 'Salsabila Adelia Putrie', email: 'salsabila.putrie@student.edu', role: 'student', active: true },
    { id: '3', name: 'Ayu Agustyna Hoky', email: 'ayu.agustyna@student.edu', role: 'student', active: true },
    { id: '4', name: 'Muhammad', email: 'muhammad@student.edu', role: 'student', active: true },
    { id: '5', name: 'Reyhan Zayyan', email: 'reyhan.zayyan@student.edu', role: 'student', active: true },
  ]);
  const [psychologists, setPsychologists] = useState<User[]>([
    { id: '6', name: 'Dr. Miftahul Jannah, M.Psi., Psikolog', email: 'miftahul.jannah@psych.com', role: 'psychologist', active: true },
    { id: '7', name: 'Dr. Nadia Wulandari, M.Psi., Psikolog', email: 'nadia.wulandari@psych.com', role: 'psychologist', active: true },
    { id: '8', name: 'Dr. Dian, M.Psi., Psikolog', email: 'dian@psych.com', role: 'psychologist', active: true },
  ]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const usersSnapshot = await getDocs(collection(db, 'users'));
  //       const studentsData: User[] = [];
  //       const psychologistsData: User[] = [];

  //       usersSnapshot.forEach((doc) => {
  //         const user = { id: doc.id, ...doc.data() } as User;
  //         if (user.role === 'student') {
  //           studentsData.push(user);
  //         } else if (user.role === 'psychologist') {
  //           psychologistsData.push(user);
  //         }
  //       });

  //       setStudents(studentsData);
  //       setPsychologists(psychologistsData);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  const toggleActive = async (userId: string, currentActive: boolean) => {
    // Mock toggle
    setStudents(students.map(user => user.id === userId ? { ...user, active: !currentActive } : user));
    setPsychologists(psychologists.map(user => user.id === userId ? { ...user, active: !currentActive } : user));
    // try {
    //   await updateDoc(doc(db, 'users', userId), { active: !currentActive });
    //   // Update local state
    //   setStudents(students.map(user => user.id === userId ? { ...user, active: !currentActive } : user));
    //   setPsychologists(psychologists.map(user => user.id === userId ? { ...user, active: !currentActive } : user));
    // } catch (error) {
    //   console.error('Error updating user:', error);
    // }
  };

  // if (loading) {
  //   return <div className="text-center">Loading...</div>;
  // }

  const UserTable = ({ users, title }: { users: User[], title: string }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-[#B58D97]/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleActive(user.id, user.active)}
                    className={`px-4 py-2 rounded text-white transition-colors duration-200 ${
                      user.active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {user.active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">Manage Users</h1>
      <UserTable users={students} title="Student Data" />
      <UserTable users={psychologists} title="Psychologist Data" />
    </div>
  );
}