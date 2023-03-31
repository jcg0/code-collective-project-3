import React, { useState } from "react";

const FriendsList = ({friendsList= []})  => {
    

debugger
return (
    <div className="flex flex-col items-center text-center space-y-20">
        <div >
          {friendsList.username &&
            friendsList.username.map((friendship,index) => (
              <div key={index} className="col-12 col-xl-6">
                <ul class="menu bg-base-100 w-56 rounded-box">
                  <li> <a href="add link to profile page">[{friendsList}]</a></li>
                </ul>
                <div class="btn-group">
                  <button class="btn">Add Friend</button>
                  <button class="btn">Remove Friend</button>
                </div>
              </div>
            ))}
        </div>
          {/* <div >
          {friendsList &&
            friendsList.map((friendship, index) => (
              <div  key={index} className="col-12 col-xl-6">
                <ul class="menu bg-base-100 w-56 rounded-box">
                  <li> <a href="add link to profile page">[{friendsList}]</a></li>
                </ul>
                <div class="btn-group">
                  <button class="btn">Add Friend</button>
                  <button class="btn">Remove Friend</button>
                </div>
              </div>
            ))}
        </div> */ }
    </div>
);
}

export default FriendsList

