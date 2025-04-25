import { useQuery } from "@apollo/client"
import { QUERY_FRIENDS } from "../../utils/queries"
import { useState } from "react"

interface FriendsModalProp{
    onClose: () => void
}

export default function FriendsModal({onClose}: FriendsModalProp) {
  
    const { data: friendsData, error: friendsError} = useQuery(QUERY_FRIENDS)
    if (friendsError) {
        console.log(JSON.stringify(friendsError))
    }
    const response= friendsData?.friends || []
    const [FriendsList] = useState(() => response)
  return (
  <>
  <h2>FRIENDS MODAL</h2>
<ul>
{FriendsList.map((obj:any)=>(
    <li key={obj._id}>{obj.username}</li>
))}

</ul>
  <button onClick= {onClose}>ADD FRIEND</button>
  </>
  )
}
