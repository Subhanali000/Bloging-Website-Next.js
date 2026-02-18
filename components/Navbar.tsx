"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Zap, LayoutDashboard } from "lucide-react"; 
import { useRouter } from "next/navigation";

export default function Navbar({ onSearch }: { onSearch?: (value: string) => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(value: string) {
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    } else {
      if (value.trim()) {
        router.push(`/?search=${encodeURIComponent(value)}`);
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-200/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Zap size={20} className="text-white fill-current" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-700">
              GuruCool
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search articles, topics..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-slate-50 border-none ring-1 ring-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/*Dashboard Button */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-slate-700 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-slate-100 hover:text-indigo-600 transition-all active:scale-95"
            >
              <LayoutDashboard size={18} />
              <span className="hidden lg:inline">Dashboard</span>
            </Link>

            
           
          </div>
        </div>
      </div>
    </header>
  );
}
