import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND } from "../../utils/mutations";
import { QUERY_USER, QUERY_USER_LIST, QUERY_ME } from "../../utils/queries";
import { Link } from "react-router-dom";

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

const FindFriends = () => {
  const [addFriend, { error }] = useMutation(ADD_FRIEND, {
    update(cache, { data: { addFriend } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me:{...me, friendsList: [...me.friendsList, addFriend]}}
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
        
      }
      
      );
    } catch (err) {
      console.error(err);
    }
  };
  const { loading, data: allUsers} = useQuery(QUERY_USER_LIST);
  const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
  
  const myFriends = meData?.me.friendsList || [];

  // const potentialFriends = [];
    
      const potentialFriends = allUsers.users.filter((friend) => {
        if (friend.username !== meData.me.username) {
          if(myFriends){
            myFriends.forEach((myFriend) => {
              if (friend.username === myFriend.username) {
                friend = null;
              }
            });
          }
         
          return friend;
        }
      });
      
    


  

  return (
    <div>
      {/* {potentialFriends && potentialFriends.map((friend, index) => (
        
          <div key={index} className=" text-center col-12 col-xl-6">
        <ul className="text-center menu bg-primary w-56 rounded-box">
          <div>
            <Link className="text-center username fs-2" to={`profile/${friend.username}`}>{friend.username}</Link>
          </div>
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
        
      ))} */}
       
    </div>
  );
};

export default FindFriends;
