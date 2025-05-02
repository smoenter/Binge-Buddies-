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
};

const MediaCard = ({ imdbID, title, poster, saved = false, mediaId, refetch }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackPoster;
  };

  const posterSrc = poster && poster !== "N/A" ? poster : fallbackPoster;

  const handleCardClick = () => {
    setShowModal(true);
  };

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

      {showModal && (
        <MediaModal imdbID={imdbID} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default MediaCard;





