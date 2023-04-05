import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND } from "../../utils/mutations";
import {
  QUERY_USER,
  QUERY_USER_LIST,
  QUERY_ME,
  QUERY_POTENTIAL_FRIENDS,
} from "../../utils/queries";
import { Link } from "react-router-dom";

const FindFriends = () => {
  const [addFriend, { error }] = useMutation(ADD_FRIEND, {
    update(cache, { data: { addFriend } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        const { potentialFriends } = cache.readQuery({
          query: QUERY_POTENTIAL_FRIENDS,
        });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, friendsList: [...me.friendsList, addFriend] } },
        });
        cache.writeQuery({
          query: QUERY_POTENTIAL_FRIENDS,
          data: {
            potentialFriends: {
              ...potentialFriends.filter(
                (friend) => friend.username !== addFriend.username
              ),
            },
          },
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
  const { loading, data: findFriends } = useQuery(QUERY_POTENTIAL_FRIENDS);

  if (loading) {
    return <div>Loading...</div>;
  }

  // const potentialFriends = allUsers.users.filter((friend) => {
  //   if (friend.username !== meData.me.username) {
  //     if(myFriends){
  //       myFriends.forEach((myFriend) => {
  //         if (friend.username === myFriend.username) {
  //           friend = null;
  //         }
  //       });
  //     }

  //     return friend;
  //   }
  // });

  return (
    <div>
      {findFriends &&
        findFriends.potentialFriends.map((friend, index) => (
          <div
            key={index}
            className="text-center inline-flex flex-row col-12 col-xl-6"
          >
            <ul className="flex-1 bg-secondary inline-flex flex-row justify-around  rounded border border-accent m-3 p-3 shadow-2xl shadow-black ">
              <Link
                className="text-center text-primary-content username p-1"
                to={`profile/${friend.username}`}
              >
                {friend.username}
              </Link>

              <button
                onClick={() => handleAdd(friend.username)}
                className="btn flex-1 bg-accent glass text-secondary-focus justify-around rounded p-1  border border-white"
              >
                Add Friend
              </button>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default FindFriends;

// const FindFriends = () => {
//   const [addFriend, { error }] = useMutation(ADD_FRIEND, {
//     update(cache, { data: { addFriend } }) {
//       try {
//         const { me } = cache.readQuery({ query: QUERY_ME });
//         cache.writeQuery({
//           query: QUERY_ME,
//           data: { me:{...me, friendsList: [...me.friendsList, addFriend]}}
//         });
//       } catch (e) {
//         console.error(e);
//       }
//     },
//   });

//   const handleAdd = async (friendName) => {
//     try {
//       const { data } = await addFriend({
//         variables: { friendName: friendName },

//       }

//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const { loading, data: allUsers } = useQuery(QUERY_USER_LIST);
//   const { loading2, data: meData} = useQuery(QUERY_ME);
//   const userArray = [allUsers];
//   const myFriends = meData?.me.friendsList || [];

//   const potentialFriends = allUsers.users.filter((friend) => {
//     if (friend.username !== meData.me.username) {
//       if(myFriends){
//         myFriends.forEach((myFriend) => {
//           if (friend.username === myFriend.username) {
//             friend = null;
//           }
//         });
//       }

//       return friend;
//     }
//   });

//   console.log(potentialFriends);

// console.log(diff1)
// console.log(filter)
// console.log(allUsers);
// console.log(filter.me.friendsList);

//   return (
//     <div>
//       {allUsers &&
//         allUsers.users.map((friend, index) => (
//           <div key={index} className=" text-center col-12 col-xl-6">
//             <ul className="text-center menu bg-primary w-56 rounded-box">
//               <div>
//                 <Link className="text-center username fs-2" to={`profile/${friend.username}`}>{friend.username}</Link>
//               </div>
//             </ul>
//             <div className="btn-group">
//               <button
//                 onClick={() => handleAdd(friend.username)}

//                 className="btn"
//               >
//                 Add Friend
//               </button>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default FindFriends;
