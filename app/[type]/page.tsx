import { PaginationComponent } from "@/components/common/Pagination";
import { PostCard } from "@/components/Postcard/PostCard";
import { fetchPost, fetchPosts } from "@/services/post";
import { getStoryIds } from "@/utils/Post";
import Image from "next/image";
import React from "react";
import astro from "@/public/Images/astro-removebg-preview.png";

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
        {post ? (
          <div className="flex flex-col">
            <PostCard {...post} key={id} defaultVisible={true} />
            <div className="mb-20"></div>
          </div>
        ) : (
          <div className="flex items-center justify-center p-6 w-full">
            <div>
              <h4 className="text-4xl font-bold">
                This post doesn&apos;t exist{" "}
              </h4>
              <p className="text-sm">
                The page your trying to view doesn&apos;t exist
              </p>
            </div>
            <Image src={astro} alt="astro" className="w-40 h-40" />
          </div>
        )}
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
