import { useQuery } from '@apollo/client';
import { GET_REACTIONS } from '../../utils/queries';

const ReactionList = ({ mediaId }: { mediaId: string }) => {
  const { loading: reactionLoading , error: reactionError, data } = useQuery(GET_REACTIONS, {
    variables: { mediaId },
  });

  if (reactionLoading) return <p>Loading reactions...</p>;
  if (reactionError) return <p>Error loading reactions.</p>;

  return (
    <div>
      <h3>Reactions</h3>
      {data.reactions.length === 0 ? (
        <p>No reactions yet.</p>
      ) : (
        data.reactions.map((r: any) => (
          <div key={r._id} className="reaction-card">
            <p>{r.comment}</p>
            <p>Season {r.season}, Episode {r.episode}</p>
            <p>Rating: {r.rating}</p>
            <small>{new Date(r.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default ReactionList;