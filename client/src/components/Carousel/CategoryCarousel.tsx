import { useEffect, useState, useRef } from "react";
import "./CategoryCarousel.css";
import MediaCard from "../MediaCard";
import MediaModal from "../MediaModal";
import { useLazyQuery } from "@apollo/client";
import { QUERY_MEDIA } from "../../utils/queries";

const categories = ["Action", "Comedy", "Family"];


type Props = {
    savedList: {
        imdbID: string;
        _id?: string;
    }[];
    type: "movie" | "series";
};

const CategoryCarousel = ({ savedList, type }: Props) => {
    const [mediaByCategory, setMediaByCategory] = useState<{ [key: string]: any[] }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<any>(null);
    const carouselsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
// MIMICK EVERYTHING IN LOADMEDIA
    const [loadMedia] = useLazyQuery(QUERY_MEDIA);

    useEffect(() => {
        const fetchData = async () => {
            const newMedia: { [key: string]: any[] } = {};

            const categoryKeywordsMap: Record<string, string[]> = {
                Action: ["hero", "marvel"],
                Comedy: [ "funny", "romantic"],
                Family: ["kids", "disney"],
                
            };

            // const categoryKeywordsMap: Record<string, string[]> = {
            //     Action: ["hero", "battle", "mission", "war", "fight", "fast", "force", "avengers", "spider", "super", "transformers", "marvel", "dc"],
            //     Comedy: ["love", "wedding", "family", "date", "party", "funny", "school", "teen", "romantic", "adventure", "holiday", "vacation", "friends"],
            //     Horror: ["ghost", "haunted", "zombie", "vampire", "evil", "hell", "nightmare", "blood", "curse", "final", "scream", "fear", "haunting", "exorcist"],
            //     Family: ["kids", "pets", "animated", "dog", "holiday", "home", "happy", "friends", "toy", "magic", "diary", "princess", "disney"],
            //     Fantasy: ["star", "x-men", "fantasy", "mummy", "magic", "dragon", "kingdom", "sorcerer", "quest", "chronicles", "realm", "world", "sword", "king", "space", "interstellar"],
            // };


            const shuffle = <T,>(array: T[]): T[] => {
                return array.sort(() => Math.random() - 0.5);
            };

            for (const category of categories) {
                try {
                    const keywords = shuffle(categoryKeywordsMap[category] || []);
                    const allResults: any[] = [];

                    for (const keyword of keywords) {
                        const page = Math.floor(Math.random() * 3) + 1;

                        const { data: searchData } = await loadMedia({
                            variables: { title: keyword, type, page },
                        });

                        const searchResults = searchData?.media || [];
                            console.log(searchResults)
                        const detailFetches = searchResults.slice(0, 5).map(async (item: any) => {
                            try {
                                const key = "trilogy" 
                                // const keyOne = "4365" //import.meta.env.VITE_OMDB_API_KEY;
                                // const keyTwo = "4c5b";


                                // const key = keyOne + keyTwo;
                                const URL = `https://www.omdbapi.com/?apikey=${key}&i=${item.imdbID}`
                            // console.log(URL)
                                const res = await fetch(URL);

                                
                                return await res.json();
                            } catch {
                                return null;
                            }
                        });

                        const detailedResults = await Promise.all(detailFetches);

                        for (const fullData of detailedResults) {
                            if (!fullData || !fullData.Genre) continue;

                            const genres = fullData.Genre.toLowerCase().split(",").map((g: string) => g.trim());

                            if (genres.includes(category.toLowerCase())) {
                                allResults.push({
                                    title: fullData.Title,
                                    Poster: fullData.Poster,
                                    imdbID: fullData.imdbID,
                                    type: fullData.Type,
                                    Genre: fullData.Genre,
                                });
                            }

                            if (allResults.length >= 10) break;
                        }

                        if (allResults.length >= 10) break;
                    }

                    const deduped = Array.from(new Map(allResults.map(item => [item.imdbID, item])).values());
                    const top10 = shuffle(deduped).slice(0, 10);
                    const merged = mergeSearchWithSaved(top10, savedList);
                    newMedia[category] = merged;
                } catch (err) {
                    console.error(`Error fetching movies for category "${category}":`, err);
                }
            }

            setMediaByCategory(newMedia);
        };

        fetchData();
    }, [type, savedList, loadMedia]);
    const mergeSearchWithSaved = (results: any[], saved: any[]) => {
        return results.map((item) => {
            const match = saved.find((s) => s.imdbID === item.imdbID);
            return {
                ...item,
                saved: Boolean(match),
                mediaId: match?._id || null,
            };
        });
    };

    const scrollCarousel = (category: string, direction: "left" | "right") => {
        const container = carouselsRef.current[category];
        if (container) {
            const scrollAmount = container.offsetWidth / 1.5; // roughly 5 cards
            container.scrollBy({
                left: direction === "right" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="category-carousel-container">
            {categories.map((category) => (
                <div key={category} className="category-section">
                    <h2 className="category-title">{category}</h2>
                    <div className="carousel-and-buttons">
                        <button
                            className="scroll-btn left"
                            onClick={() => scrollCarousel(category, "left")}
                            aria-label="Scroll left"
                        >
                            <img width="30" height="30" src="https://img.icons8.com/fluency-systems-regular/48/less-than.png" alt="less-than" />
                        </button>
                        <div className="carousel-wrapper">
                            <div className="carousel" ref={(el) => (carouselsRef.current[category] = el)}>
                                {mediaByCategory[category]?.map((media) => {
                                    return (
                                        <MediaCard
                                            key={media.imdbID}
                                            title={media.title}
                                            type={media.type}
                                            poster={media.Poster || ""}
                                            imdbID={media.imdbID}
                                            saved={media.saved}
                                            mediaId={media.mediaId}
                                            onClick={() => {
                                                setSelectedMedia(media);
                                                setIsModalOpen(true);
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <button
                            className="scroll-btn right"
                            onClick={() => scrollCarousel(category, "right")}
                            aria-label="Scroll right"
                        >
                            <img width="30" height="30" src="https://img.icons8.com/fluency-systems-regular/48/more-than.png" alt="more-than" />
                        </button>
                    </div>
                </div>
            ))}
            {isModalOpen && selectedMedia && (
                <MediaModal
                    imdbID={selectedMedia.imdbID}
                    title={selectedMedia.title}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default CategoryCarousel;