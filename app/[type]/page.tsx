import { PaginationComponent } from "@/components/common/Pagination";
import { PostCard } from "@/components/Postcard/PostCard";
import { fetchPost, fetchPosts } from "@/services/post";
import { getStoryIds } from "@/utils/Post";
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
  const { page = "1", id } = (await searchParams) || 1;

  if (id) {
    const post = await fetchPost(+id);
    return (
      <main className="w-full overflow-y-auto max-h-[calc(100vh-70px)] border-r">
        <div className="flex flex-col">
          {/* <Link
            href={`/${post?.type || "new"}?id=${post?.parent || "0"}`}
            className="mt-2 ml-2 h-9 w-9 rounded-full bg-muted flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft />
            <span></span>
          </Link> */}
          <PostCard {...post} key={id} defaultVisible={true} />
          <div className="mb-20"></div>
        </div>
      </main>
    );
  }
  const storyIds = await getStoryIds(type);
  const totalPages = Math.ceil(storyIds.length / itemsPerPage);

  const start = (+page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const posts = await fetchPosts(storyIds, start, end);

  return (
    <main className="w-full overflow-y-auto max-h-[calc(100vh-70px)] border-r">
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
