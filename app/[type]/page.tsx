import Navbar from "@/components/Navbar";
import { MessageCircle, Triangle } from "lucide-react";
import Link from "next/link";
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
    <main className="">
      <Navbar />
      <h1 className="font-bold text-2xl mb-4">
        Hacker News -- {type} stories (Page {page})
      </h1>
      <div className="flex flex-col gap-8">
        {posts.map((post, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex gap-2 font-lg items-center">
              <div className="bg-foreground w-9 h-9 rounded-full"></div>
              <div>
                <p className="font-medium">
                  {post.by
                    ? post.by.charAt(0).toUpperCase() + post.by.slice(1)
                    : "Unknown"}
                </p>
                <p className="hover:underline text-xs cursor-pointer animate-in transition-all">
                  #{post?.id}
                </p>
              </div>
            </div>
            <h3 className="text-2xl hover:text-primary animate-in transition-all ">
              <Link target="_blank" href={post.url ?? ""}>
                {post.title}
              </Link>
            </h3>
            {post.text ? (
              <p>{post.text?.slice(0, 100) + "..."}</p>
            ) : (
              <p className="text-secondary">No supporting text</p>
            )}
            <div className="flex gap-4">
              <div className="flex items-center justify-center gap-1 bg-secondary border-foreground rounded-md px-2 py-1">
                <MessageCircle size={17} />
                <p>Comments</p>
              </div>
              <div className="flex items-center justify-center gap-1 bg-secondary border-foreground rounded-md px-2 py-1">
                <Triangle size={17} />
                <p>Upvote</p>
              </div>
            </div>
          </div>
        ))}
      </div>

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
