import React, { useState } from "react";
import Star from "../Star/index";
import MediaModal from "../MediaModal/index"; 
import "./index.css"; 
import fallbackPoster from "../../assets/default-movie-poster.jpg";

type Props = {
  title: string;
  type: "movie" | "series";
  saved?: boolean;
  poster: string;
};

//MediaCard-- used to display the media card for each movie or series.
            //this displays the title, poster, and a star icon to indicate if the media is saved or not.
const MediaCard = ({ title, poster, saved = false }: Props) => {

  const [showModal, setShowModal] = useState(false);
  const [mediaInfo, setMediaInfo] = useState<any>(null);

  // Function to handle image error or no poster-- sets fallback image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackPoster;
  };

  // Sets poster or fallback image
  const posterSrc = poster && poster !== "N/A" ? poster : fallbackPoster;


  // Function to handle card click-- fetches additional media info from OMDB API
  const handleCardClick = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=YOUR_API_KEY&t=${encodeURIComponent(title)}&plot=full`);
      const data = await response.json();
      setMediaInfo(data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
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
        {/* <p className="card-text">Type: {type}</p> */}
        <div className="d-flex gap-3">
          <Star saved={saved} />
          {/* <Heart /> */}
        </div>
      </div>
    </div>

    {showModal && mediaInfo && (
        <MediaModal
          title={title}
          poster={mediaInfo.Poster}
          plot={mediaInfo.Plot}
          year={mediaInfo.Year}
          trailerLink={`https://www.youtube.com/results?search_query=${encodeURIComponent(mediaInfo.Title)}+trailer`}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
export default MediaCard;