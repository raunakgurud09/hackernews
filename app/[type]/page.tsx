import Navbar from "@/components/Navbar";
import React from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const itemsPerPage = 20;
  const { page } = (await searchParams) || 1;
  const { type } = await params;

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

  // Fetch details of posts for the current page
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
      <h1>Hacker News Top Stories (Page {page})</h1>
      {posts.map((post, idx) => (
        <div key={idx}>
          <h3>{post.title}</h3>
          {/* <p>By: {post.by}</p>
          {post.url && (
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          )} */}
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
