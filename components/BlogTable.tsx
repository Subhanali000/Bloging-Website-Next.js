"use client";

import Link from "next/link";

type Blog = {
  id: string;
  title: string;
  author: string;
  createdAt: string;
};

type Props = {
  blogs: Blog[];
  onDelete: (id: string) => void;
};

export default function BlogTable({ blogs, onDelete }: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Author</th>
            <th className="p-4">Date</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((blog) => (
            <tr
              key={blog.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4 font-medium">{blog.title}</td>

              <td className="p-4 text-gray-600">{blog.author}</td>

              <td className="p-4 text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>

              <td className="p-4 text-right space-x-3">
                <Link
                  href={`/edit/${blog.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => onDelete(blog.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {blogs.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="p-6 text-center text-gray-500"
              >
                No blogs available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
