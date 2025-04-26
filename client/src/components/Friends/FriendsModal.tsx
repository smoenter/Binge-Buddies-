import { useQuery } from "@apollo/client";
import { QUERY_FRIENDS } from "../../utils/queries";
import { useState, useEffect } from "react";

interface FriendsModalProp {
  onClose: () => void;
}

export default function FriendsModal({ onClose }: FriendsModalProp) {
  const { data: friendsData, error: friendsError } = useQuery(QUERY_FRIENDS);
  const friends = friendsData?.friends || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFriends, setFilteredFriends] = useState(friends);

  useEffect(() => {
    setFilteredFriends(
      friends.filter((friend: any) =>
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, friends]);

  if (friendsError) {
    console.error(JSON.stringify(friendsError));
  }

  return (
    <>
      <h2>Find a Friend</h2>
      <input
        type="text"
        placeholder="Search friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <ul>
        {filteredFriends.map((obj: any) => (
          <li key={obj._id}>{obj.username}</li>
        ))}
      </ul>
      <button onClick={onClose}>CLOSE</button>
    </>
  );
}