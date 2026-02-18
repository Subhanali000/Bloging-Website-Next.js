import HomeClient from "@/components/HomeClient";

async function getBlogs() {
  const res = await fetch("http://localhost:3000/api/blogs", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();

  return <HomeClient blogs={blogs} />;
}
