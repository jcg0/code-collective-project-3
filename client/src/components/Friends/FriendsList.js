import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../utils/mutations";

const FriendsList = ({friendsList})  => {
    
  const [addFriend, {error}] = useMutation(ADD_FRIEND)

  const [removeFriend, {err}] = useMutation(REMOVE_FRIEND)

  // const handleAdd = () => {addFriend}

  // const handleRemove = () => {removeFriend}

// debugger
return (
    <div className="flex flex-col items-center text-center space-y-20">
        {/* <div >
          {friendsList &&
            friendsList.map((friendList,index) => (
              <div key={index} className="col-12 col-xl-6">
                <ul class="menu bg-base-100 w-56 rounded-box">
                  <li> <a href="add link to profile page">{friendList.username}</a></li>
                </ul>
                <div class="btn-group">
                  <button onClick={handleAdd} class="btn">Add Friend</button>
                  <button onClick={handleRemove} class="btn">Remove Friend</button>
                </div>
              </div>
            ))}
        </div> */}
    </div>
);
}

export default FriendsList

