import React, { useState } from "react";

const findFriends = ({}) => {

    return(
         <div >
            {friendsList &&
              friendsList.map((friendList, index) => (
                <div  key={index} className="col-12 col-xl-6">
                  <ul class="menu bg-base-100 w-56 rounded-box">
                    <li> <a href="add link to profile page">{}</a></li>
                  </ul>
                  <div class="btn-group">
                    <button class="btn">Add Friend</button>
                    <button class="btn">Remove Friend</button>
                  </div>
                </div>
              ))}
          </div>  
    )
}

export default findFriends