import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { SAVE_MEDIA } from "../../utils/mutations";
import { useNavigate } from "react-router-dom"; //redirecting manually

type StarProps = {
  saved?: boolean;
  media: {
    title: string;
    type: string;
    genre?: string[];
    description?: string;
    posterUrl?: string;
    trailerUrl?: string;
  };
};

const Star = ({ saved, media }: StarProps) => {
  const [active, setActive] = useState(saved);
  const [saveMedia] = useMutation(SAVE_MEDIA);
  const navigate = useNavigate(); 

  const handleClick = async () => {
    try {
      await saveMedia({ variables: { input: media } });
      setActive(true);
    } catch (error: any) {
      console.error("Error saving media:", error);

      if (error?.message.includes("Not logged in") || error?.graphQLErrors?.[0]?.extensions?.code === "UNAUTHENTICATED") {
        alert("You must be logged in to save shows!");
        navigate("/login");
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div onClick={handleClick} style={{ display: "inline-block", cursor: "pointer" }}>
      <FaStar size={24} color={active ? "gold" : "gray"} />
    </div>
  );
};

export default Star;


