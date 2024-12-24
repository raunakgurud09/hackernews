import { PaginationComponent } from "@/components/common/Pagination";
import { PostCard } from "@/components/Postcard/PostCard";
import { fetchPosts, getStoryIds } from "@/services/post";
import React from "react";

type tParams = Promise<{ type: string }>;
type tSearchParams = Promise<{ page?: string; id?: string }>;
const itemsPerPage = 20;

export default async function Page({
  params,
  searchParams,
}: {
  params: tParams;
  searchParams: tSearchParams;
}) {
  const { type } = await params;
  const { page = "1" } = (await searchParams) || 1;

  const storyIds = await getStoryIds(type);
  const totalPages = Math.ceil(storyIds.length / itemsPerPage);

  const start = (+page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const posts = await fetchPosts(storyIds, start, end);

  return (
    <main className="w-full overflow-y-auto max-h-[calc(100vh-70px)] border-r">
      {/* <PostTopBanner type={type} /> */}
      <div className="flex flex-col ">
        {posts.map((post, idx) => {
          return <PostCard {...post} key={idx} />;
        })}
      </div>
      {/* Pagination Controls */}
      <PaginationComponent totalPages={totalPages} page={+page} type={type} />
    </main>
  );
}
