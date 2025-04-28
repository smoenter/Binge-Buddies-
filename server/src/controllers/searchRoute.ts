import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: './server/.env' });

const router = express.Router();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = process.env.OMDB_BASE_URL; 

if (!OMDB_API_KEY || !OMDB_BASE_URL) {
    throw new Error("OMDB_API_KEY or OMDB_BASE_URL is not set in the environment variables.");
  }  

router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing search query." }); // Ensure return value for this path
  }

  try {
    const response = await axios.get(`${OMDB_BASE_URL}`, {
      params: {
        apikey: OMDB_API_KEY,
        s: query,
      },
    });

    const data = response.data;

    if (data.Response === "True") {
      // Sends back only the array of search results
      return res.json(data.Search); // Ensure return value here
    } else {
      return res.status(404).json({ error: data.Error }); // Ensure return value here
    }
  } catch (error) {
    console.error("Error searching OMDB:", error);
    return res.status(500).json({ error: "Internal server error." }); // Ensure return value here
  }
});

export default router;