import Star from "../Star/index";


type Props = {
  title: string;
  type: "movie" | "tv";
  saved?: boolean;
};

const MediaCard = ({ title, type, saved = false }: Props) => {
  return (
    <div className="card text-dark" style={{ width: "18rem" }}>
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