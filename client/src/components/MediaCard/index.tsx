import React, { useState } from "react";
import Star from "../Star/index";
import MediaModal from "../MediaModal/index";
import "./index.css";
import fallbackPoster from "../../assets/default-movie-poster.jpg";
// import { useQuery } from "@apollo/client";
// import { QUERY_MEDIA_DETAILS } from "../../utils/queries";

type Props = {
  title: string;
  type: "movie" | "series";
  saved?: boolean;
  poster: string;
  imdbID: string;
};

//MediaCard-- used to display the media card for each movie or series.
//this displays the title, poster, and a star icon to indicate if the media is saved or not.
const MediaCard = ({ imdbID, title, poster, saved = false }: Props) => {

  const [showModal, setShowModal] = useState(false);

  // Function to handle image error or no poster-- sets fallback image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackPoster;
  };

  // Sets poster or fallback image
  const posterSrc = poster && poster !== "N/A" ? poster : fallbackPoster;

  // Function to handle card click-- fetches additional media info from OMDB API
  const handleCardClick = async () => {
      setShowModal(true);
  };

  console.log(imdbID);


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
          {/* <p className="card-text">Type: {type}</p> */}
          <div className="d-flex gap-3">
            <Star saved={saved}  imdbID={imdbID} />
            {/* <Heart /> */}
          </div>
        </div>
      </div>

      {showModal && (
        <MediaModal
          imdbID={imdbID}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default MediaCard;
