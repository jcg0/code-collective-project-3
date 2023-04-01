import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const FriendsList = ({friendsList})  => {
    
  const [removeFriend, { error }] = useMutation(REMOVE_FRIEND,{
    update(cache, { data: { removeFriend } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeFriend },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemove = async (friendName) => {
    try {
      const { data } = await removeFriend({
        variables: { friendName: friendName },
      });
    } catch (err) {
      console.error(err);
    }
  };
  console.log(friendsList)

  if (!friendsList.length) {
    return <h3>Add Some Friends!</h3>;
  }
  

// debugger
return (
    <div className="flex flex-col items-center text-center space-y-20">
        `<div >
          {friendsList &&
            friendsList.map((friendList,index) => (
              <div key={index} className="col-12 col-xl-6">
                <ul className="menu bg-base-100 w-56 rounded-box">
                  <li> <a href="add link to profile page">{friendList.username}</a></li>
                </ul>
                <div class="btn-group">
                  <button onClick={()=>handleRemove(friendList.username)} className="btn">Remove Friend</button>
                </div>
              </div>
            ))}
        </div>`
    </div>
);
}

export default FriendsList

