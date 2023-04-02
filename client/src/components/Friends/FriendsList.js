import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { Link } from "react-router-dom";

const FriendsList = ({ users }) => {
  const [removeFriend, { error }] = useMutation(REMOVE_FRIEND, {
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
  console.log(users);

  // if (!users.length) {
  //   return <h3>Add Some Friends!</h3>;
  // }

  // debugger
  return (
    <div className="flex flex-col items-center text-center space-y-20">
      <div>
        {users &&
          users.map((friendList, index) => (
            <div key={index} className="text-center col-12 col-xl-6">
              <ul className="text-center menu bg-primary w-56 rounded-box">
                <div>
                  {" "}
                  <Link className="text-center username" to={`profile/${friendList.username}`}>{friendList.username}</Link>
                </div>
              </ul>
              <div class="btn-group">
                <button
                  onClick={() => handleRemove(friendList.username)}
                  className="btn"
                >
                  Remove Friend
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendsList;
