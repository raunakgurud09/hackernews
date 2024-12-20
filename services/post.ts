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

export const getStoryIds = async (type: string) => {
  const apiUrl = apiEndpoints[type] || apiEndpoints["new"];
  try {
    const response = await fetch(apiUrl, { next: { revalidate: 300 } });
    const storyIds: number[] = await response.json();
    // TODO: Handle poll IDs
    // storyIds.push(21231804); // poll id
    return storyIds;
  } catch (error) {
    console.error(`Failed to fetch story IDs for ${type}:`, error);
    return [];
  }
};
