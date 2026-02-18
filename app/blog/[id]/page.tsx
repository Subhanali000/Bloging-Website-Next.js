import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/footer"; 
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Blog = {
  id: string;
  title: string;
  author: string;
  content?: string;
  createdAt: string;
};

async function getBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) return notFound();

  const firstImageMatch = blog.content?.match(/<img [^>]*src="([^">]+)"[^>]*>/);
  const heroImage = firstImageMatch?.[1] || null;

  const cleanedContent = firstImageMatch 
    ? blog.content?.replace(firstImageMatch[0], "") 
    : blog.content;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50"> {/* Light background to make card pop */}
      <Navbar />

      <main className="grow">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all mb-6 text-sm font-medium group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>

          {/* --- THE MAIN CARD UI --- */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* 1. Header Section (Inside Card) */}
            <div className="p-8 md:p-12 pb-0">
              <header className="space-y-6 mb-8">
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-slate-500 border-y border-slate-100 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                      {blog.author[0].toUpperCase()}
                    </div>
                    <span className="font-semibold text-slate-900">{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-indigo-500" />
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long", day: "numeric", year: "numeric"
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-indigo-500" />
                    <span>5 min read</span>
                  </div>
                </div>
              </header>
            </div>

            {/* 2. Hero Image (Inside Card) */}
            {heroImage && (
              <div className="px-8 md:px-12">
                <div className="w-full h-100 md:h-125 rounded-2xl overflow-hidden shadow-inner bg-slate-50 flex items-center justify-center border border-slate-100">
                  <img 
                    src={heroImage} 
                    alt={blog.title} 
                    className="max-w-full max-h-full object-contain p-2"
                  />
                </div>
              </div>
            )}

            {/* 3. Content Area (Inside Card) */}
            <div className="p-8 md:p-12 pt-10">
              <div
                className="prose prose-lg prose-slate max-w-none 
                prose-headings:text-slate-900 prose-headings:font-bold
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto
                prose-a:text-indigo-600 prose-strong:text-slate-900"
                dangerouslySetInnerHTML={{
                  __html: cleanedContent || "<p className='text-center py-10'>No content available.</p>",
                }}
              />
            </div>

          </div>
          {/* --- END CARD UI --- */}

        </article>
      </main>

      <Footer />
    </div>
  );
}