'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Snowfall from "react-snowfall";

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Manage Users', href: '/admin/users', icon: '👥' },
  { name: 'Manage Consultation Schedule', href: '/admin/schedules', icon: '📅' },
  { name: 'Manage Articles', href: '/admin/articles', icon: '📝' },
  { name: 'Payments', href: '/admin/payments', icon: '💰' },
  { name: 'Reports', href: '/admin/reports', icon: '📋' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-blue-100 relative overflow-hidden">
      {/* Snowfall Effect */}
      <Snowfall />

      {/* Sidebar */}
      <div className="w-64 bg-white/95 backdrop-blur-sm shadow-xl rounded-r-2xl relative z-10">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <ul>
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-[#B58D97]/10 hover:text-[#B58D97] transition-colors duration-200 ${
                    pathname === item.href ? 'bg-[#B58D97]/20 border-r-4 border-[#B58D97] text-[#B58D97]' : ''
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}