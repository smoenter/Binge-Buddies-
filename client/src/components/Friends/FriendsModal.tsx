import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_FRIENDS } from "../../utils/queries";
import { ADD_FRIEND } from "../../utils/mutations";


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

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFriends, setFilteredFriends] = useState<Friends[]>([]);
    const [selectedFriend, setSelectedFriend] = useState<Friends | null>(null);
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState({});
    const [errorMessage, setErrorMessage] = useState(""); 
    const [errorStyle, setErrorStyle] = useState({}); // State for error style

    

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
          setSelectedFriend(result[0]);
          setErrorMessage("");
        } else {
          console.log("User not found");
          setMessage("User not found");
          setMessageStyle({ color: "red", fontWeight: "bold", marginTop: "10px" });
          setSelectedFriend(null);
        }
      };

      const handleAddFriend = async () => {
        if (selectedFriend) {
          console.log("Adding friend with userId:", userId, "and friendId:", selectedFriend._id);
          try {
            const { data } = await addFriend({
              variables: { userId, friendId: selectedFriend._id },
            });
            alert(`Friend added: ${selectedFriend.username}`);
            console.log("Friend added:", data);
            setErrorMessage(""); // Clear any previous error
          } catch (err) {
            console.error("Error adding friend:", err);
            setErrorMessage("Unable to add friend. Please try again."); // Set error message
            setErrorStyle({ color: "red", fontWeight: "bold", marginTop: "10px" }); // Set error style
          }
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
                width: "300px", 
                maxWidth: "90%", 
              }}
            />
             <div style={messageStyle}>{message}</div>
            {selectedFriend && (
              <button
                onClick={handleAddFriend}
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  width: "150px",
                  maxWidth: "90%",
                }}
              >
                Add Friend
              </button>
            )}
            <div style={errorStyle}>{errorMessage}</div> 
            <button
              onClick={onClose}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                width: "150px", 
                maxWidth: "90%", 
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      );
    }