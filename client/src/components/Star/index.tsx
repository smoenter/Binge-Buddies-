import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_MEDIA } from "../../utils/mutations";
import { QUERY_MEDIA_DETAILS } from "../../utils/queries";
import Auth from "../../utils/auth";

type StarProps = {
  saved?: boolean;
  imdbID: string;
};

const Star = ({ saved = false, imdbID }: StarProps) => {
  const [active, setActive] = useState(saved);
  const [saveMedia] = useMutation(SAVE_MEDIA, {
    refetchQueries: ["me", "QUERY_ME"],
  });

  // Fetch full media details from OMDB
  const { data, loading, error } = useQuery(QUERY_MEDIA_DETAILS, {
    variables: { imdbID },
    skip: !imdbID,
  });

  useEffect(() => {
    setActive(saved);
  }, [saved]);

  if (loading) return <p>Loading details...</p>;
  if (error) console.error("❌ Error loading media details:", error);

  const handleClick = async () => {
    if (!Auth.loggedIn()) {
      window.location.assign("/login");
      return;
    }

    if (!data?.mediaDetails) {
      console.warn("Media details not loaded yet.");
      return;
    }

    try {
      await saveMedia({
        variables: {
          imdbID
        },
      });
      setActive(true);
    } catch (err) {
      console.error("❌ Error saving media:", err);
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <FaStar size={24} color={active ? "gold" : "gray"} />
    </div>
  );
};

export default Star;



