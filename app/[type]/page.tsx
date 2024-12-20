import { PaginationComponent } from "@/components/common/Pagination";
import { PostCard } from "@/components/common/PostCard";
import React from "react";

type tParams = Promise<{ type: string }>;
type tSearchParams = Promise<{ page: string }>;

const fetchPosts = async (storyIds: number[], start: number, end: number) => {
  const posts = await Promise.all(
    storyIds.slice(start, end).map(async (id) => {
      try {
        const post = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
          { next: { revalidate: 300 } }
        )
          .then((res) => res.json())
          .then((data) => data || null);

        return post;
      } catch (error) {
        console.error(`Failed to fetch post with ID ${id}:`, error);
        return null;
      }
    })
  );
  return posts.filter(Boolean); // Filter out null posts
};

const getStoryIds = async (type: string) => {
  const apiEndpoints: Record<string, string> = {
    top: "https://hacker-news.firebaseio.com/v0/topstories.json",
    new: "https://hacker-news.firebaseio.com/v0/newstories.json",
    best: "https://hacker-news.firebaseio.com/v0/beststories.json",
    job: "https://hacker-news.firebaseio.com/v0/jobstories.json",
    show: "https://hacker-news.firebaseio.com/v0/showstories.json",
    ask: "https://hacker-news.firebaseio.com/v0/askstories.json",
  };
  const apiUrl = apiEndpoints[type] || apiEndpoints["new"];
  try {
    const response = await fetch(apiUrl, { next: { revalidate: 300 } });
    const storyIds: number[] = await response.json();
    // TODO: Handle poll IDs
    // storyIds.push(21231804); // poll id
    return storyIds;
  } catch (error) {
    console.error(`Failed to fetch story IDs for ${type}:`, error);
    return [];
  }
};

export default async function Page({
  params,
  searchParams,
}: {
  params: tParams;
  searchParams: tSearchParams;
}) {
  const itemsPerPage = 20;
  const { type } = await params;
  // TODO: fix this error in console
  // use { page } here and also manage type on the page
  const { page } = (await searchParams) || 1;

  console.log(page);
  const storyIds = await getStoryIds(type);
  const totalPages = Math.ceil(storyIds.length / itemsPerPage);

  const start = (+page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const posts = await fetchPosts(storyIds, start, end);

  return (
    <main className="w-full overflow-y-auto max-h-[calc(100vh-70px)] border-r">
      <div className="flex flex-col ">
        {posts.map((post, idx) => {
          console.log(post);
          return <PostCard {...post} key={idx} />;
        })}
      </div>
      {/* Pagination Controls */}
      <PaginationComponent totalPages={totalPages} page={+page} type={type} />
    </main>
  );
}
