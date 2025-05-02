import { useQuery } from "@apollo/client";
import MediaCard from "../MediaCard";
import { QUERY_ME } from "../../utils/queries";
import "./index.css";

type Props = {
  results: any[];
  refetch?: () => void;
};

const MediaSearch = ({ results, refetch }: Props) => {
  const { data } = useQuery(QUERY_ME);
  const savedMedia = data?.me?.savedMedia || [];

  return (
    <div>
      <h1>Search results</h1>
      {results.length > 0 ? (
        <div className="movie-results">
          {results.map((movie: any) => {
            const match = savedMedia.find((item: any) => item.imdbID === movie.imdbID);
            return (
              <MediaCard
                key={movie.imdbID}
                title={movie.Title}
                type={movie.Type}
                poster={movie.Poster}
                imdbID={movie.imdbID}
                saved={Boolean(match)}
                mediaId={match?._id || null}
                refetch={refetch}
              />
            );
          })}
        </div>
      ) : (
        <p>No results found. Please try again.</p>
      )}
    </div>
  );
};

export default MediaSearch;






