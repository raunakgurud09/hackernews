import { fetchWrapper } from "@/lib/fetch";
import { API_ENDPOINTS } from "./constants";

export const fetchPosts = async (
  storyIds: number[],
  start: number,
  end: number
) => {
  const posts = await Promise.all(
    storyIds.slice(start, end).map(async (id) => {
      const post = await fetchWrapper(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );
      return post;
    })
  );

  return posts.filter(Boolean);
};

export const getStoryIds = async (type: string) => {
  const apiUrl = API_ENDPOINTS[type] || API_ENDPOINTS["new"];
  const storyIds: number[] = (await fetchWrapper(apiUrl)) || [];
  return storyIds;
};
