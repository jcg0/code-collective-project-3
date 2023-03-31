import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER_FRIENDS } from "../utils/queries";
import auth from "../utils/auth";
import { useParams } from "react-router-dom";

const Friends = () => {
    const{friendList} =  useParams();

    const {loading, data} = useQuery(friendList ? QUERY_USER_FRIENDS :
        QUERY_ME,
        {
            variables:{friendList: friendList}
        }
    );
console.log(QUERY_ME)
console.log(QUERY_USER_FRIENDS)
    // Check if data is returning from the `QUERY_ME` query
  const friend = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }
console.log(friendList)
console.log(friend)
console.log(data)
    
    // if (!friendList.length) {
    //   return <h3>You have not added any friends yet!</h3>;
    // }

    return (
        <div className="flex flex-col items-center text-center space-y-20">
          <h1 className="antialiased text-2xl font-extrabold">
                Friends List
              </h1>
          <div >
            {friendList &&
              friendList.map((friendship) => (
                <div key={friendship} className="col-12 col-xl-6">
                  <ul class="menu bg-base-100 w-56 rounded-box">
                    <li> <a href="add link to profile page">{friend}</a></li>
                  </ul>
                  <div class="btn-group">
                    <button class="btn">Add Friend</button>
                    <button class="btn">Remove Friend</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      );


};

export default Friends;