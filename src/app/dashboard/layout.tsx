"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard as LayoutDashboardIcon,
  Users as UsersIcon,
  Eye as ViewIcon,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-react"; // adjust if your icon library is different

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/[0.5] bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative w-64 bg-white dark:bg-gray-900 shadow-md h-full">
          <div className="flex items-center justify-between h-[60px] px-4 border-b">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <LayoutDashboardIcon className="h-6 w-6" />
              Dashboard
            </Link>
            <button onClick={() => setSidebarOpen(false)}>
              <XIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
          <nav className="flex-1 overflow-auto py-4 px-4 space-y-2 text-sm font-medium">
            <SidebarLinks />
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:grid w-60 border-r bg-gray-100/40 dark:bg-gray-800/40">
        <div className="flex flex-col h-full">
          <div className="flex items-center h-[60px] px-6 border-b">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <LayoutDashboardIcon className="h-6 w-6" />
              Dashboard
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4 px-4 space-y-2 text-sm font-medium">
            <SidebarLinks />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Top Bar (for mobile menu button) */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b shadow-sm bg-white dark:bg-gray-900">
          <button onClick={() => setSidebarOpen(true)}>
            <MenuIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
          <span className="font-semibold">Dashboard</span>
        </div>

        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}

function SidebarLinks() {
  return (
    <>
      <Link
        href="/dashboard/summaries"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition"
      >
        <ViewIcon className="h-4 w-4" />
        Summaries
      </Link>
      <Link
        href="/dashboard/account"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition"
      >
        <UsersIcon className="h-4 w-4" />
        Account
      </Link>
    </>
  );
}
