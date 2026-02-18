import Link from "next/link";
import { Github, Twitter, Linkedin, Zap } from "lucide-react";

export default function Footer() {
  return (
    //all the things and features here is only for the better looking page 
    <footer className="bg-gray-200 border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Zap size={20} className="text-indigo-600 fill-indigo-600" />
              <span className="text-xl font-bold text-slate-900">GuruCool</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Sharing knowledge, one story at a time. Join our community of 10k+ writers and readers.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/" className="hover:text-indigo-600">Browse Articles</Link></li>
              <li><Link href="/create" className="hover:text-indigo-600">Write a Post</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Newsletter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-indigo-600">Help Center</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Connect</h4>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Twitter size={20} /></Link>
              <Link href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Github size={20} /></Link>
              <Link href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Linkedin size={20} /></Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-50 pt-8 text-center">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} GuruCool Assignments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}