import React, { useState } from "react";
import Star from "../Star";
import MediaModal from "../MediaModal";
import "./index.css";
import fallbackPoster from "../../assets/default-movie-poster.jpg";

type Props = {
  title: string;
  type: "movie" | "series";
  saved?: boolean;
  poster: string;
  imdbID: string;
  mediaId?: string;
  refetch?: () => void;
  onClick?: () => void;
  isWatchlistPage?: boolean;
};
const MediaCard = ({
  imdbID,
  title,
  poster,
  saved = false,
  mediaId,
  refetch,
  onClick,
  isWatchlistPage = false,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackPoster;
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsModalOpen(true);
    }
  };

  const posterSrc = poster && poster !== "N/A" ? poster : fallbackPoster;

  return (
    <>
      <div className="card" style={{ width: "12rem" }} onClick={handleCardClick}>
        <img
          src={posterSrc}
          className="card-img-top"
          alt={title}
          loading="lazy"
          onError={handleImageError}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className="d-flex gap-3">
            <Star imdbID={imdbID} saved={saved} mediaId={mediaId} refetch={refetch} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <MediaModal
          imdbID={imdbID}
          title={title}
          onClose={() => setIsModalOpen(false)}
          isWatchlistPage={isWatchlistPage}
        />
      )}
    </>
  );
};

export default MediaCard;