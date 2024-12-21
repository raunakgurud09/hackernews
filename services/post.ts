import { fetchWrapper } from "@/lib/fetch";
import { apiEndpoints } from "@/utils/constants";

export const fetchPosts = async (
  storyIds: number[],
  start: number,
  end: number
) => {
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
  return posts.filter(Boolean);
};

export const fetchPost = async (postId: number) => {
  try {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch post with ID ${postId}: ${response.statusText}`
      );
    }

    const post = await response.json();
    return post || null;
  } catch (error) {
    console.error(`Failed to fetch post with ID ${postId}:`, error);
    return null;
  }
};

export const getStoryIds = async (type: string) => {
  const apiUrl = apiEndpoints[type] || apiEndpoints["new"];
  try {
    const storyIds: number[] = (await fetchWrapper(apiUrl)) || [];
    return storyIds;
    // TODO: Handle poll IDs
    // storyIds.push(21231804); // poll id
    return storyIds;
  } catch (error) {
    console.error(`Failed to fetch story IDs for ${type}:`, error);
    return [];
  }
};
