import Link from "next/link";
import { Calendar, User, Clock, ArrowRight, FileText } from "lucide-react"; // Professional icons

type Blog = {
  id: string;
  title: string;
  author: string;
  content?: string;
  createdAt: string;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  const safeHTML = typeof blog.content === "string" ? blog.content : "";

  const getFirstImage = (html: string) => {
    const match = html.match(/<img src="([^">]+)"/);
    return match ? match[1] : null;
  };

  //Strip HTML to calculate accurate reading time
  const getReadingTime = (html: string) => {
    const words = html.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const time = Math.ceil(words / 200); // Avg 200 wpm
    return time < 1 ? 1 : time;
  };

  const featuredImage = getFirstImage(safeHTML);
  const readingTime = getReadingTime(safeHTML);
  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden h-full">
      
      {/* ✅ Featured Image or Icon Placeholder */}
      <div className="relative w-full h-52 overflow-hidden bg-slate-50">
        {featuredImage ? (
          <img
            src={featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-400">
            <FileText size={48} strokeWidth={1.5} />
          </div>
        )}
        {/* Overlay Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-indigo-600 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg shadow-sm">
            Article
          </span>
        </div>
      </div>

      {/* Middle Section: Content */}
      <div className="p-6 space-y-4 grow">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
            {blog.title}
          </h2>
          
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-indigo-500" />
              <span className="font-medium">{blog.author}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>

        {/* Text Preview */}
        <div
          className="text-slate-600 text-sm line-clamp-3 leading-relaxed [&_img]:hidden [&_h1]:hidden [&_h2]:hidden"
          dangerouslySetInnerHTML={{ __html: safeHTML }}
        />
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center px-6 py-4 border-t border-slate-50 bg-slate-50/30">
        <div className="flex items-center gap-2 text-slate-400">
          <Calendar size={14} />
          <span className="text-xs font-medium">{formattedDate}</span>
        </div>

        <Link
          href={`/blog/${blog.id}`}
          className="inline-flex items-center gap-2 text-indigo-600 text-sm font-bold hover:gap-3 transition-all"
        >
          Read Article
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}