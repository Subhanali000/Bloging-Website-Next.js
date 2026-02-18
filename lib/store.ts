export type Blog = {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
};

let blogs: Blog[] = [];

export const store = {
  getAll: () => blogs,
  get: (id: string) => blogs.find((b) => b.id === id),

  create: (blog: Blog) => {
    blogs.push(blog);
  },

  update: (id: string, updated: Partial<Blog>) => {
    const index = blogs.findIndex((b) => b.id === id);
    if (index !== -1) {
      blogs[index] = { ...blogs[index], ...updated };
    }
  },

  delete: (id: string) => {
    blogs = blogs.filter((b) => b.id !== id);
  },
};
