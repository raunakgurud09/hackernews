import { PostCard } from "@/components/common/PostCard";
import { PaginationComponent } from "@/components/Pagination";
import React from "react";

type tParams = Promise<{ type: string }>;
type tSearchParams = Promise<{ page: string }>;

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

  const apiEndpoints: Record<string, string> = {
    top: "https://hacker-news.firebaseio.com/v0/topstories.json",
    new: "https://hacker-news.firebaseio.com/v0/newstories.json",
    best: "https://hacker-news.firebaseio.com/v0/beststories.json",
    job: "https://hacker-news.firebaseio.com/v0/jobstories.json",
  };
  const apiUrl = apiEndpoints[type] || apiEndpoints["new"];

  const storyIds = await fetch(apiUrl, {
    cache: "no-store",
    next: { revalidate: 300 },
  }).then((res) => res.json());

  const start = (+page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  // const hasNextPage = storyIds.length > end;

  const posts = await Promise.all(
    storyIds.slice(start, end).map(async (id: number) => {
      const post = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
        { cache: "force-cache", next: { revalidate: 300 } }
      )
        .then((res) => res.json())
        .then((r) => {
          if (r) {
            return r;
          }
        });
      return post;
    })
  );

  return (
    <main className="w-full overflow-y-auto max-h-[calc(100vh-70px)]">
      <h1 className="font-bold text-3xl p-3 md:p-6">
        {type.charAt(0).toUpperCase() + type.slice(1)} stories
      </h1>
      <div className="flex flex-col  ">
        {posts.map((post, idx) => {
          return <PostCard {...post} key={idx} />;
        })}
      </div>
      {/* Pagination Controls */}
      <PaginationComponent page={+page} type={type} />
    </main>
  );
}

// <div style={{ marginTop: "20px" }}>
//   {+page > 1 && (
//     <a
//       href={`/${type}/?page=${+page - 1}`}
//       style={{ marginRight: "10px" }}
//     >
//       Previous Page
//     </a>
//   )}
//   {/* Next Page */}
//   {hasNextPage && (
//     <a href={`/${type}/?page=${+page + 1}`}>Next Page</a>
//   )}{" "}
// </div>
