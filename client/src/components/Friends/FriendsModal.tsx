import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_FRIENDS } from "../../utils/queries";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../utils/mutations";

interface Friends {
  _id: string;
  username: string;
}

interface FriendsModalProp {
  onClose: () => void;
  userId: string;
}

export default function FriendsModal({ onClose, userId }: FriendsModalProp) {
  const { loading: friendsLoading, data: friendsData, error: friendsError } = useQuery(QUERY_FRIENDS);
  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFriends, setFilteredFriends] = useState<Friends[]>([]);
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState({});

  useEffect(() => {
    if (friendsData?.friends) {
      setFilteredFriends(
        friendsData.friends.filter((friend: Friends) =>
          friend.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, friendsData]);

  const handleSearch = () => {
    const result = filteredFriends.filter((friend) =>
      friend.username.toLowerCase() === searchTerm.toLowerCase()
    );
    if (result.length > 0) {
      console.log("User found:", result[0]);
      setMessage(`User found: ${result[0].username}`);
      setMessageStyle({ color: "teal", fontWeight: "bold", marginTop: "10px" });
    } else {
      console.log("User not found");
      setMessage("User not found");
      setMessageStyle({ color: "red", fontWeight: "bold", marginTop: "10px" });
    }
  };

  const handleAddFriend = async (friendId: string) => {
    console.log("Adding friend with userId:", userId, "and friendId:", friendId);
    try {
      const { data } = await addFriend({
        variables: { userId, friendId },
      });
      alert(`Friend added`);
      console.log("Friend added:", data);
    } catch (err) {
      console.error("Error adding friend:", err);
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    console.log("Deleting friend with userId:", userId, "and friendId:", friendId);
    try {
      const { data } = await removeFriend({
        variables: { userId, friendId },
      });
      alert(`Friend removed`);
      console.log("Friend removed:", data);
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  if (friendsLoading) {
    return <p>Loading friends...</p>;
  }

  if (friendsError) {
    console.error(JSON.stringify(friendsError));
    return <p>Error loading friends.</p>;
  }

  return (
    <div>
      <h2>All Users</h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
        <input
          type="text"
          placeholder="Search for a friend..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginBottom: "10px",
            padding: "5px",
            width: "300px",
            maxWidth: "90%",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginBottom: "10px",
            padding: "5px 10px",
            width: "150px",
            maxWidth: "90%",
            backgroundColor: "#008080",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
        {filteredFriends.map((user: Friends) => (
          <div
            key={user._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              background: "gray",
            }}
          >
            <span>{user.username}</span>
            <div>
              <button
                onClick={() => handleAddFriend(user._id)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#20B2AA",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Friend
              </button>
              <button
                onClick={() => handleRemoveFriend(user._id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#20B2AA",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Unfriend
              </button>
            </div>
          </div>
        ))}
        <div style={messageStyle}>{message}</div>
        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#ccc",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}