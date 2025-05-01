import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { SAVE_MEDIA } from "../../utils/mutations";
import { useNavigate } from "react-router-dom"; //redirecting manually

type StarProps = {
  saved?: boolean;
  imdbID: string;
};

const Star = ({ saved, imdbID }: StarProps) => {
  const [active, setActive] = useState(saved);
  const [saveMedia] = useMutation(SAVE_MEDIA);
  const navigate = useNavigate(); 

  const handleClick = async () => {
    try {
      await saveMedia({ variables: { imdbID } });
      setActive(true);
    } catch (error: any) {
      console.error("Error saving media:", error);

      if (error?.message.includes("Not logged in") || error?.graphQLErrors?.[0]?.extensions?.code === "UNAUTHENTICATED") {
        alert("You must be logged in to save shows!");
        navigate("/login");
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


