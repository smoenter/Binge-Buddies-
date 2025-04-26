export type mediaTypeType="movie" | "series" | "all"

export async function fetchMedia(title: string, mediaType: mediaTypeType) {
    const baseURL = process.env.OMDB_BASE_URL || "https://www.omdbapi.com/?";
  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    throw new Error("OMDB_API_KEY is not defined in your .env file.");
  }

  const typeParam = (mediaType === "movie" || mediaType === "series") ? `&type=${mediaType}` : "";
  const fullURL = `${baseURL}apikey=${apiKey}&s=${encodeURIComponent(title)}${typeParam}`;

  console.log("📡 Fetching from:", fullURL); // Helpful for debugging

  const response = await fetch(fullURL);

  if (!response.ok) {
    throw new Error(`OMDB request failed: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to fetch media");
  }

  return data;
}
