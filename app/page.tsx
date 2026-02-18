import HomeClient from "@/components/HomeClient";

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();

  return <HomeClient blogs={blogs} />;
}
