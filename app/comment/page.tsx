import { PostCard } from "@/components/Postcard/PostCard";
import { fetchPost } from "@/services/post";
import Image from "next/image";
import React from "react";
import astro from "@/public/Images/astro-removebg-preview.png";

type tSearchParams = Promise<{ id?: string }>;

export default async function page({
  searchParams,
}: {
  searchParams: tSearchParams;
}) {
  const { id } = (await searchParams) || 1;

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
          <NotFound />
        )}
      </main>
    );
  } else {
    return <NotFound />;
  }
}

const NotFound = () => {
  return (
    <div className="flex items-center justify-center p-6 w-full">
      <div>
        <h4 className="text-4xl font-bold">This post doesn&apos;t exist </h4>
        <p className="text-sm">
          The page your trying to view doesn&apos;t exist
        </p>
      </div>
      <Image src={astro} alt="astro" className="w-40 h-40" />
    </div>
  );
};
