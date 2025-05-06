import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_FRIENDS } from "../../utils/queries";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../utils/mutations";

import "./FriendsModal.css";

interface Friends {
  _id: string;
  username: string;
}

interface FriendsModalProp {
  onClose: () => void;
  userId: string;
  friendIds: Set<string>;
  setFriendIds: (ids: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
}

export default function FriendsModal({
  onClose,
  friendIds,
  setFriendIds,
  userId,
}: FriendsModalProp) {
  const { loading: friendsLoading, data: friendsData, error: friendsError } = useQuery(QUERY_FRIENDS);
  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFriends, setFilteredFriends] = useState<Friends[]>([]);
  const [showAllFriends, setShowAllFriends] = useState(false);
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState({});

    // ✅ Load friendIds from localStorage on mount
    useEffect(() => {
      const storedFriendIds = localStorage.getItem(`friendIds_${userId}`);
      if (storedFriendIds) {
        try {
          const parsedIds = JSON.parse(storedFriendIds);
          if (Array.isArray(parsedIds)) {
            setFriendIds(new Set(parsedIds));
          }
        } catch (e) {
          console.error("Failed to parse stored friend IDs:", e);
        }
      }
    }, [userId]);

 // ✅ Filter friends as user types
  useEffect(() => {
    if (friendsData?.friends) {
      setFilteredFriends(
        friendsData.friends.filter((friend: Friends) =>
          friend.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, friendsData]);

    // Auto-clear message after 3 seconds
    useEffect(() => {
      if (message) {
        const timer = setTimeout(() => setMessage(""), 3000);
        return () => clearTimeout(timer);
      }
    }, [message]);


  const handleSearch = () => {
    const result = filteredFriends.filter((friend) =>
      friend.username.toLowerCase() === searchTerm.toLowerCase()
    );
    if (result.length > 0) {
      setMessage(`User found: ${result[0].username}`);
      setMessageStyle({ color: "teal", fontWeight: "bold", marginTop: "10px" });
    } else {
      setMessage("User not found");
      setMessageStyle({ color: "red", fontWeight: "bold", marginTop: "10px" });
    }
  };

  const toggleFriendship = async (friendId: string, username: string) => {
    const isCurrentlyFriend = friendIds.has(friendId);

    try {
      if (isCurrentlyFriend) {
        await removeFriend({ variables: { friendId } });
      } else {
        await addFriend({ variables: { friendId } });
      }

      setFriendIds((prev: Set<string>) => {
        const updated = new Set(prev);
        if (isCurrentlyFriend) {
          updated.delete(friendId);
          setMessage(`Removed ${username} from your friends.`);
          setMessageStyle({ color: "red", fontWeight: "bold", marginTop: "10px" });
        } else {
          updated.add(friendId);
          setMessage(`Added ${username} to your friends.`);
          setMessageStyle({ color: "green", fontWeight: "bold", marginTop: "10px" });
        }

        // ✅ Save to localStorage
        localStorage.setItem(`friendIds_${userId}`, JSON.stringify(Array.from(updated)));

        return updated;
      });
    } catch (err) {
      console.error("Error toggling friendship:", err);
    }
  };

  const isFriend = (id: string) => friendIds.has(id);

  if (friendsLoading) return <p>Loading friends...</p>;
  if (friendsError) {
    console.error(friendsError);
    return <p>Error loading friends.</p>;
  }

  const displayedUsers = showAllFriends
    ? friendsData.friends.filter((user: Friends) => friendIds.has(user._id))
    : filteredFriends;


  return (
    <div className="friends-modal">
      <div className="friends-header">
        <h2 className="friends-title">Find Friends</h2>
        <button onClick={onClose} className="btn btn-close" />
      </div>

      <div className="friends-container">
        <div className="friends-header">
          <input
            type="text"
            placeholder="Search for a friend..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="friends-input"
          />
          <button className="btn btn-search" type="button" onClick={handleSearch}>
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/search--v1.png"
              alt="search"
            />
          </button>
        </div>

        <button
          onClick={() => setShowAllFriends(!showAllFriends)}
          className="btn-your-friends btn-toggle"
        >
          {showAllFriends ? "Hide Friends" : "Your Friend List"}
        </button>

        {message && <div className="friends-message" style={messageStyle}>{message}</div>}

        <div className="friends-list">
          {displayedUsers.map((user: Friends) => (
            <div key={user._id} className="friend-card">
              <span>{user.username}</span>
              <button
                onClick={() => toggleFriendship(user._id, user.username)}
                className={`btn ${isFriend(user._id) ? "btn-unfriend" : "btn-friend"}`}
              >
                {isFriend(user._id) ? "Unfriend" : "Friend"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}