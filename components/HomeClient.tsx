"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation"; 
import Navbar from "./Navbar";
import BlogCard from "./BlogCard";
import Footer from "./footer"; 

type Blog = {
  id: string;
  title: string;
  author: string;
  content?: string;
  createdAt: string;
};

// 1. Create a sub-component to handle search params safely
function HomeContent({ blogs }: { blogs: Blog[] }) {
  const [filtered, setFiltered] = useState(blogs ?? []);
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("search");

  // Logic to filter blogs
  function handleSearch(query: string) {
    const q = query.toLowerCase();
    setFiltered(
      blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      )
    );
  }

  //Auto-filter when the URL changes (from Navbar redirect)
  useEffect(() => {
    if (queryParam) {
      handleSearch(queryParam);
    } else {
      setFiltered(blogs);
    }
  }, [queryParam, blogs]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
  <Navbar onSearch={handleSearch} />

  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grow w-full">
    <div className="mb-10 space-y-2">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Latest Stories
      </h1>
      <p className="text-slate-500">
        Explore insights, tutorials, and stories from our community.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filtered.length === 0 ? (
        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
          
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-indigo-100/50 rounded-full blur-2xl transform scale-150"></div>
            <img 
              src="https://www.svgrepo.com/show/429915/not-found-error-alert.svg" 
              alt="No Articles Found" 
              className="relative w-40 h-40 md:w-48 md:h-48 drop-shadow-sm"
            />
          </div>

          <h3 className="text-2xl font-bold text-slate-900">No Articles Found</h3>
          </div>
          
      ) : (
        filtered.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))
      )}
    </div>
  </main>
  <Footer />
</div>
  );
}


export default function HomeClient({ blogs }: { blogs: Blog[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <HomeContent blogs={blogs} />
    </Suspense>
  );
}
