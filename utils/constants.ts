export const AVATAR_URL = "https://avatar.iran.liara.run/public/";

export const BASE_HN_URL = "https://news.ycombinator.com";

export const HN_USER_INFO_PAGE = "https://news.ycombinator.com/user?id=";

export const API_BASE_URL = "https://hacker-news.firebaseio.com/v0";

export const apiEndpoints: Record<string, string> = {
  top: `${API_BASE_URL}/topstories.json`,
  new: `${API_BASE_URL}/newstories.json`,
  best: `${API_BASE_URL}/beststories.json`,
  job: `${API_BASE_URL}/jobstories.json`,
  show: `${API_BASE_URL}/showstories.json`,
  ask: `${API_BASE_URL}/askstories.json`,
  comment: `${API_BASE_URL}/item/`,
};
