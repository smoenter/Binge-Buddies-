import Star from "../Star/index";


type Props = {
  title: string;
  type: "movie" | "series";
  saved?: boolean;
  poster: string;
};

const fallbackPoster = "/placeholder.jpg";

const MediaCard = ({ title, type, poster, saved = false }: Props) => {

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackPoster;
  };

  const posterSrc = poster && poster !== "N/A" ? poster : fallbackPoster;

  return (
    <div className="card text-dark" style={{ width: "18rem" }}>
      <img 
        src={posterSrc} 
        className="card-img-top" 
        alt={title} 
        loading="lazy"
        onError={handleImageError}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Type: {type}</p>
        <div className="d-flex gap-3">
          <Star saved={saved} />
          {/* <Heart /> */}
        </div>
      </div>
    </div>
  );
};
export default MediaCard;