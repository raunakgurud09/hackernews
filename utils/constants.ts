export const AVATAR_URL = "https://avatar.iran.liara.run/public/";

export const HN_USER_INFO_PAGE = "https://news.ycombinator.com/user?id=";

export const API_BASE_URL = "https://hacker-news.firebaseio.com/v0";

export const API_ENDPOINTS: Record<string, string> = {
  top: `${API_BASE_URL}/topstories.json`,
  new: `${API_BASE_URL}/newstories.json`,
  best: `${API_BASE_URL}/beststories.json`,
  job: `${API_BASE_URL}/jobstories.json`,
};

export const apiEndpoints: Record<string, string> = {
  top: "https://hacker-news.firebaseio.com/v0/topstories.json",
  new: "https://hacker-news.firebaseio.com/v0/newstories.json",
  best: "https://hacker-news.firebaseio.com/v0/beststories.json",
  job: "https://hacker-news.firebaseio.com/v0/jobstories.json",
  show: "https://hacker-news.firebaseio.com/v0/showstories.json",
  ask: "https://hacker-news.firebaseio.com/v0/askstories.json",
};
