import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND } from "../../utils/mutations";
import { QUERY_USER, QUERY_USER_LIST } from "../../utils/queries";
import { Link } from "react-router-dom";

const FindFriends = () => {
  const [addFriend, { error }] = useMutation(ADD_FRIEND, {
    update(cache, { data: { addFriend } }) {
      try {
        cache.writeQuery({
          query: QUERY_USER_LIST,
          data: { user: addFriend },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleAdd = async (friendName) => {
    try {
      const { data } = await addFriend({
        variables: { friendName: friendName },
      });
    } catch (err) {
      console.error(err);
    }
  };
  const { loading, data } = useQuery(QUERY_USER_LIST);

  console.log(data);

  return (
    <div>
      {data &&
        data.users.map((friend, index) => (
          <div key={index} className="col-12 col-xl-6">
            <ul className="menu bg-base-100 w-56 rounded-box">
              <li>
                <Link to={`profile/${friend.username}`}>{friend.username}</Link>
              </li>
            </ul>
            <div className="btn-group">
              <button
                onClick={() => handleAdd(friend.username)}
                className="btn"
              >
                Add Friend
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FindFriends;
