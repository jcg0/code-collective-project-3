import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import auth from "../utils/auth";
import { useParams } from "react-router-dom";

const Friends = ({friendsList}) => {
    const{friendList} =  useParams();

    const {loading, data} = useQuery(
        QUERY_ME,
        {
            variables:{friendList: friendList}
        }
    );

    // Check if data is returning from the `QUERY_ME` query
  const friend = data?.me || {};

  if (loading) {
    return <div>Loading...</div>;
  }

    
    if (!friendsList.length) {
      return <h3>You have not added any friends yet!</h3>;
    }

    return (
        <div>
          <div >
            {friendsList &&
              friendsList.map((friend) => (
                <div key={friend} className="col-12 col-xl-6">
                  <ul class="menu bg-base-100 w-56 rounded-box">
                    <li><a>{friend}</a></li>
                  </ul>
                </div>
              ))}
          </div>
        </div>
      );


};

export default Friends;