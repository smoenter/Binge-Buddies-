import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { SAVE_MEDIA, REMOVE_MEDIA } from "../../utils/mutations";
import Auth from "../../utils/auth";
import toast from "react-hot-toast";

type StarProps = {
  saved?: boolean;
  imdbID: string;
  mediaId?: string;
  refetch?: () => void;
};

const Star = ({ saved = false, imdbID, mediaId, refetch }: StarProps) => {
  const [active, setActive] = useState(saved);
  const [saveMedia] = useMutation(SAVE_MEDIA);
  const [removeMedia] = useMutation(REMOVE_MEDIA);

  useEffect(() => {
    setActive(saved);
  }, [saved]);

  const handleClick = async () => {
    if (!Auth.loggedIn()) {
      window.location.assign("/login");
      return;
    }

    if (active && mediaId) {
      const confirmed = window.confirm("Remove this from your Watchlist?");
      if (!confirmed) return;

      try {
        await removeMedia({ variables: { mediaId } });
        setActive(false);
        toast.success("Removed from Watchlist");
        if (refetch) refetch();
      } catch (error) {
        console.error("Error removing media:", error);
        toast.error("Failed to remove");
      }
      return;
    }

    if (active) {
      toast("This is already in your Watchlist", {
        icon: "⭐",
        style: { background: "#fef3c7", color: "#92400e" },
      });
      return;
    }

    try {
      await saveMedia({ variables: { imdbID } });
      setActive(true);
      toast.success("Saved to Watchlist");
      if (refetch) refetch(); // Trigger refresh so star updates on re-search
    } catch (error) {
      console.error("Error saving media:", error);
      toast.error("Failed to save");
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: active && !mediaId ? "not-allowed" : "pointer",
        opacity: active && !mediaId ? 0.6 : 1,
      }}
      title={active ? (mediaId ? "Click to remove" : "Already saved") : "Click to save"}
    >
      <FaStar size={24} color={active ? "gold" : "gray"} />
    </div>
  );
};

export default Star;

