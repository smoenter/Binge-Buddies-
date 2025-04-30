import fetch from 'node-fetch';

export type mediaTypeType = "movie" | "series" | "all";

export async function fetchMedia(title: string, mediaType: mediaTypeType) {
  let baseURL = process.env.OMDB_BASE_URL || "https://www.omdbapi.com/";
  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    throw new Error("OMDB_API_KEY is not defined in your .env file.");
  }

  // Make sure baseURL ends with a slash
  if (!baseURL.endsWith("/")) {
    baseURL += "/";
  }

  const typeParam = (mediaType === "movie" || mediaType === "series") ? `&type=${mediaType}` : "";
  const fullURL = `${baseURL}?apikey=${apiKey}&s=${encodeURIComponent(title)}${typeParam}`;

  console.log("📡 Fetching from:", fullURL);

  try {
    const response = await fetch(fullURL);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OMDB request failed with status ${response.status}:`, errorText);
      throw new Error(`OMDB request failed: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("🎬 API Response:", data);

    if (data.Response === "False") {
      const errorMessage = data.Error || "Failed to fetch media";
      console.error("Error in response:", errorMessage);
      throw new Error(errorMessage);
    }

    return data;

  } catch (error) {
    console.error("Error occurred while fetching media:", error);
    throw new Error("An error occurred while fetching media. Please try again later.");
  }
}

