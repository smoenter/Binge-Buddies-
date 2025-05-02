import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { SAVE_MEDIA, REMOVE_MEDIA } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { QUERY_ME } from "../../utils/queries";

type StarProps = {
  saved?: boolean;
  imdbID: string;
  mediaId?: string; // <- needed for delete
};

const Star = ({ saved = false, imdbID, mediaId }: StarProps) => {
  const [active, setActive] = useState(saved);
  const [saveMedia] = useMutation(SAVE_MEDIA, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const [removeMedia] = useMutation(REMOVE_MEDIA, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  useEffect(() => {
    setActive(saved);
  }, [saved]);

  const handleClick = async () => {
    if (!Auth.loggedIn()) {
      window.location.assign("/login");
      return;
    }

    if (active) {
      // Already saved, ask to remove
      const confirmDelete = window.confirm(
        "Do you want to remove this from your watchlist?"
      );
      if (!confirmDelete) return;

      if (!mediaId) {
        console.error("Missing mediaId. Cannot delete.");
        return;
      }

      try {
        await removeMedia({
          variables: { mediaId },
        });
        setActive(false);
      } catch (error) {
        console.error("Error removing media:", error);
      }
    } else {
      // Not saved yet, save it
      try {
        await saveMedia({
          variables: { imdbID },
        });
        setActive(true);
      } catch (error) {
        console.error("Error saving media:", error);
      }
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <FaStar size={24} color={active ? "gold" : "gray"} />
    </div>
  );
};

export default Star;




