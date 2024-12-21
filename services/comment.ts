import { API_BASE_URL } from "@/utils/constants";

export const fetchComments = async (ids: number[]) => {
  return Promise.all(
    ids.map(async (id) => {
      const res = await fetch(`${API_BASE_URL}/item/${id}.json`);
      if (!res.ok) {
        throw new Error(`Failed to fetch comment with ID: ${id}`);
      }
      return res.json();
    })
  );
};
