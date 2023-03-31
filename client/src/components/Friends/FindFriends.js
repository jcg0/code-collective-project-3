import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../utils/mutations";

const findFriends = ({}) => {

    // const [addFriend, {error}] = useMutation(ADD_FRIEND)

    // const [removeFriend, {err}] = useMutation(REMOVE_FRIEND)


    return(
         <div >
            {friendsList &&
              friendsList.map((friendList, index) => (
                <div  key={index} className="col-12 col-xl-6">
                  <ul class="menu bg-base-100 w-56 rounded-box">
                    <li> <a href="add link to profile page">{friendList.username}</a></li>
                  </ul>
                  <div class="btn-group">
                    <button class="btn">Add Friend</button>
                    <button  class="btn">Remove Friend</button>
                  </div>
                </div>
              ))}
          </div>  
    )
}

export default findFriends