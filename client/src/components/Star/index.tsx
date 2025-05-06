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
      toast(
        (t) => (
          <span>
            Remove this from your Watchlist?
            <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
              {/* YES BUTTON */}
              <div
                style={{
                  transition: "transform 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "scale(1)";
                }}
              >
                <button
                  onClick={async () => {
                    try {
                      await removeMedia({ variables: { mediaId } });
                      setActive(false);
                      toast.dismiss(t.id);
                      toast.success("Removed from Watchlist");
                      if (refetch) refetch();
                    } catch (error) {
                      console.error("Error removing media:", error);
                      toast.dismiss(t.id);
                      toast.error("Failed to remove");
                    }
                  }}
                  style={{
                    backgroundColor: "#4389a2",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Yes
                </button>
              </div>

              {/* CANCEL BUTTON */}
              <div
                style={{
                  transition: "transform 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "scale(1)";
                }}
              >
                <button
                  onClick={() => toast.dismiss(t.id)}
                  style={{
                    backgroundColor: "#dc2626",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </span>
        ),
        {
          duration: 10000,
        }
      );
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
      if (refetch) refetch();
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


