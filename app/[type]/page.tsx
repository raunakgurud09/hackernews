import Navbar from "@/components/Navbar";
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

  const storyIds = await fetch(apiUrl, { cache: "force-cache" }).then((res) =>
    res.json()
  );

  const start = (+page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const hasNextPage = storyIds.length > end;

  const posts = await Promise.all(
    storyIds.slice(start, end).map(async (id: number) => {
      const post = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
        { cache: "force-cache" }
      )
        .then((res) => res.json())
        .then((r) => {
          return r;
        });
      return post;
    })
  );

  return (
    <main className="p-10">
      <Navbar />
      <h1 className="font-bold text-2xl mb-4">
        Hacker News Top Stories (Page {page})
      </h1>
      {posts.map((post, idx) => (
        <div key={idx}>
          <h3>{post.title}</h3>
        </div>
      ))}

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        {+page > 1 && (
          <a
            href={`/${type}/?page=${+page - 1}`}
            style={{ marginRight: "10px" }}
          >
            Previous Page
          </a>
        )}
        {/* Next Page */}
        {hasNextPage && (
          <a href={`/${type}/?page=${+page + 1}`}>Next Page</a>
        )}{" "}
      </div>
    </main>
  );
}
