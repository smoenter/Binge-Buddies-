import { useQuery } from "@apollo/client";
import { QUERY_FRIENDS } from "../../utils/queries";
import { useState, useEffect } from "react";

interface Friends {
    _id: string;
    username: string;
}

interface FriendsModalProp {
    onClose: () => void;
}

export default function FriendsModal({ onClose }: FriendsModalProp) {
    const { loading: friendsLoading, data: friendsData, error: friendsError } = useQuery(QUERY_FRIENDS);
    const friends: Friends[] = friendsData?.friends || [];

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFriends, setFilteredFriends] = useState<Friends[]>([]);

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
            alert(`User found: ${result[0].username}`);
        } else {
            console.log("User not found");
            alert("User not found");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    if (friendsLoading) {
        return <p>Loading friends...</p>;
    }

    if (friendsError) {
        console.error(JSON.stringify(friendsError));
        return <p> Error loading friends.</p>
    }

    return (
        <div>
          <h2>Find a Friend</h2>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
            <input
              type="text"
              placeholder="Search friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                marginBottom: "10px",
                padding: "5px",
                width: "300px", // Set a fixed width for the search bar
                maxWidth: "90%", // Ensure it doesn't exceed the container width
              }}
            />
            <button
              onClick={onClose}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                width: "150px", // Set a fixed width for the button
                maxWidth: "90%", // Ensure it doesn't exceed the container width
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      );
}