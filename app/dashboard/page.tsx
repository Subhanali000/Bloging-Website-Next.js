"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit3, Trash2, Eye, Plus, FileText, User as UserIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

type Blog = {
  id: string;
  title: string;
  author: string;
  createdAt: string;
};

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchBlogs() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBlog(id: string) {
    if (confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      fetchBlogs();
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grow w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Content Management</h1>
            <p className="text-slate-500 mt-1">Manage, edit, and monitor your community stories.</p>
          </div>
          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
          >
            <Plus size={20} />
            Create New Post
          </Link>
        </div>

        {/* Simple Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-slate-500 text-sm font-medium mb-1">Total Posts</div>
            <div className="text-3xl font-bold text-slate-900">{blogs.length}</div>
          </div>
          {/* Add more stats here as your API grows */}
        </div>

        {/* Structured Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Article Title</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Author</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Date Published</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-slate-400">Loading your content...</td>
                  </tr>
                ) : blogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center">
                      <FileText className="mx-auto text-slate-200 mb-4" size={48} />
                      <p className="text-slate-500 font-medium">No blogs found. Start by creating your first post!</p>
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-900 block truncate max-w-xs md:max-w-md">
                          {blog.title}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                            <UserIcon size={12} className="text-slate-500" />
                          </div>
                          <span className="text-sm text-slate-600">{blog.author}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/blog/${blog.id}`}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            title="View"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link 
                            href={`/edit/${blog.id}`}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit3 size={18} />
                          </Link>
                          <button
                            onClick={() => deleteBlog(blog.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}