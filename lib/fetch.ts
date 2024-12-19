export const fetchWrapper = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T | null> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch from ${url}:`, response.statusText);
      return null;
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return null;
  }
};
