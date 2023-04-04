import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { Link } from "react-router-dom";

const FriendsList = ({ users }) => {
  const [removeFriend, { error }] = useMutation(REMOVE_FRIEND, {
    update(cache, { data: { removeFriend } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: {
              ...me,
              friendsList: {
                ...me.friendsList.filter(
                  (friend) => friend.username !== removeFriend.username
                ),
              },
            },
          },
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

  if (!users.length) {
    return <h3 className=" text-secondary-focus">Add Some Friends!</h3>;
  }

  // debugger
  return (
    <div className="flex flex-wrap items-center text-center space-y-20">
      <div>
        {users &&
          users.map((friendList, index) => (
            <div
              key={index}
              className="text-center inline-flex flex-row col-12 col-xl-6"
            >
              <ul className="flex-1 bg-secondary inline-flex flex-row justify-around rounded p-3 m-3 border border-accent shadow-2xl shadow-black">
                {" "}
                <Link
                  className="text-center text-primary-content username p-1"
                  to={`profile/${friendList.username}`}
                >
                  {friendList.username}
                </Link>
                <button
                  onClick={() => handleRemove(friendList.username)}
                  className="btn flex-1 bg-accent glass text-secondary-focus justify-around rounded p-1  border border-white"
                >
                  Remove Friend
                </button>
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendsList;
