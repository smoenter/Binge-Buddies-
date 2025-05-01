import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { SAVE_MEDIA } from "../../utils/mutations";
import Auth from "../../utils/auth";

type StarProps = {
  saved?: boolean;
  imdbID: string;
};

const Star = ({ saved = false, imdbID }: StarProps) => {
  const [active, setActive] = useState(saved);
  const [saveMedia] = useMutation(SAVE_MEDIA);

  useEffect(() => {
    setActive(saved);
  }, [saved]);

  const handleClick = async () => {
    if (!Auth.loggedIn()) {
      window.location.assign("/login");
      return;
    }

    try {
      await saveMedia({
        variables: { imdbID },
      });
      setActive(true);
    } catch (error) {
      console.error("Error saving media:", error);
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <FaStar size={24} color={active ? "gold" : "gray"} />
    </div>
  );
};

export default Star;



