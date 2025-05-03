import { useEffect, useState, useRef } from "react";
import "./CategoryCarousel.css";
import MediaCard from "../MediaCard";
import MediaModal from "../MediaModal";
import { useLazyQuery } from "@apollo/client";
import { QUERY_MEDIA } from "../../utils/queries";

const categories = ["Action", "Comedy", "Horror", "Family", "Fantasy"];
//     };

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

    const [loadMedia] = useLazyQuery(QUERY_MEDIA);

    useEffect(() => {
        const fetchData = async () => {
            const newMedia: { [key: string]: any[] } = {};

            for (const category of categories) {
                try {
                    const { data } = await loadMedia({
                        variables: { title: category, type },
                    });

                    if (data?.media) {
                        const merged = mergeSearchWithSaved(data.media, savedList);
                        newMedia[category] = merged;
                    }
                } catch (err) {
                    console.error(`Failed to fetch media for category "${category}"`, err);
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
                    <div className="carousel-wrapper">
                        <button
                            className="scroll-btn left"
                            onClick={() => scrollCarousel(category, "left")}
                            aria-label="Scroll left"
                        >
                            ◀
                        </button>
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
                        <button
                            className="scroll-btn right"
                            onClick={() => scrollCarousel(category, "right")}
                            aria-label="Scroll right"
                        >
                            ▶
                        </button>
                    </div>
                </div>
            ))}
            {isModalOpen && selectedMedia && (
                <MediaModal
                    imdbID={selectedMedia.imdbID}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default CategoryCarousel;